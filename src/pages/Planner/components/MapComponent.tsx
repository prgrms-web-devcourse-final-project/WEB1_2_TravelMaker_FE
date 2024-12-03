import React, { useRef, useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, OverlayView, Polyline } from "@react-google-maps/api";
import styled from "styled-components";
import NormalMarker from "@components/normalmarker/NormalMarker";
import NormalMarkerDetails from "@components/markerdetails/NormalMarkerDetails";
import ConfirmedMarker from "@components/confirmedmarker/ConfirmedMarker";
import SearchBar from "@components/search/SearchBar";
import SearchResultList from "@components/searchresultlist/SearchResultList";
import ZoomScreen from "@components/zoomscreen/ZoomScreen";

const MapComponent = () => {
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const initialCenter = {
    lat: 37.5649867,
    lng: 126.985575,
  };

  const mapOptions: google.maps.MapOptions = {
    minZoom: 4,
    maxZoom: 18,
    disableDefaultUI: true,
    zoomControl: false,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_KEY,
    libraries: ["places"],
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  const [markers, setMarkers] = useState<
    {
      lat: number;
      lng: number;
      title?: string;
      address?: string;
      isConfirmed?: boolean;
      index?: number;
    }[]
  >([]);
  const [selectedMarker, setSelectedMarker] = useState<{
    lat: number;
    lng: number;
    title?: string;
    address?: string;
    imageSrc?: string;
  } | null>(null);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<
    { imageSrc: string; title: string; address: string; lat: number; lng: number }[]
  >([]);
  const [currentZoom, setCurrentZoom] = useState(10);
  const [mapCenter] = useState(initialCenter);
  const [isSearchVisible, setIsSearchVisible] = useState(true);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    geocoderRef.current = new window.google.maps.Geocoder();

    map.addListener("rightclick", (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newMarker = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        addMarker(newMarker);
        fetchLocationDetails(newMarker.lat, newMarker.lng);
      }
    });
  };

  const fetchLocationDetails = async (lat: number, lng: number) => {
    if (!geocoderRef.current || !mapRef.current) return;

    const location = { lat, lng };

    geocoderRef.current.geocode({ location }, (results, status) => {
      if (status === "OK" && results && results.length > 0) {
        const formattedAddress = results[0]?.formatted_address || "Unknown Location";
        const placeName = results[0]?.address_components?.[0]?.short_name || "Unnamed Place";

        const service = new window.google.maps.places.PlacesService(mapRef.current!);
        const placeRequest = {
          location,
          rankBy: google.maps.places.RankBy.DISTANCE,
        };

        service.nearbySearch(placeRequest, (placeResults, placeStatus) => {
          let photoUrl = "https://via.placeholder.com/100x70";

          if (placeStatus === window.google.maps.places.PlacesServiceStatus.OK && placeResults) {
            const firstPlace = placeResults[0];

            photoUrl = firstPlace?.photos?.[0]?.getUrl({ maxWidth: 100 }) || photoUrl;
          }

          addMarker({
            lat,
            lng,
            title: placeName,
            address: formattedAddress,
            imageSrc: photoUrl,
          });
        });
      }
    });
  };

  const onUnmount = () => {
    mapRef.current = null;
  };

  const handleMarkerClick = (marker: { lat: number; lng: number }, index: number) => {
    const clickedMarker = markers.find((m) => m.lat === marker.lat && m.lng === marker.lng);

    if (clickedMarker) {
      setSelectedMarker(clickedMarker);
    }
    setActiveMarker(index);
  };

  const handleModalClose = () => {
    setSelectedMarker(null);
    setActiveMarker(null);
  };

  const handleConfirm = () => {
    setMarkers((prevMarkers) => {
      const updatedMarkers = prevMarkers.map((marker) =>
        marker.lat === selectedMarker?.lat && marker.lng === selectedMarker?.lng
          ? {
              ...marker,
              isConfirmed: true,
            }
          : marker
      );

      const confirmedMarkers = updatedMarkers.filter((marker) => marker.isConfirmed);
      const unconfirmedMarkers = updatedMarkers.filter((marker) => !marker.isConfirmed);

      let confirmedIndex = 1;

      const sortedMarkers = [
        ...confirmedMarkers.map((marker) => ({
          ...marker,
          index: confirmedIndex++,
        })),
        ...unconfirmedMarkers,
      ];

      return sortedMarkers;
    });

    handleModalClose();
  };

  const handleSearch = (query: string) => {
    if (!query.trim() || !mapRef.current) return;

    setSearchResults([]);
    setIsSearchVisible(true);

    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const center = mapRef.current.getCenter();

    const request = {
      query,
      fields: ["name", "formatted_address", "photos", "geometry"],
      location: center,
      radius: 10000,
    };

    service.textSearch(request, (results, status, pagination) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const formattedResults = results
          .map((result) => {
            const lat = result.geometry?.location?.lat();
            const lng = result.geometry?.location?.lng();

            if (lat === undefined || lng === undefined || isNaN(lat) || isNaN(lng)) {
              return null;
            }
            const imageSrc =
              result.photos && result.photos.length > 0
                ? result.photos[0].getUrl({ maxWidth: 100 })
                : "https://via.placeholder.com/100x70";

            return {
              title: result.name || "Unnamed Place",
              address: result.formatted_address || "No Address",
              lat,
              lng,
              imageSrc,
            };
          })
          .filter((result) => !!result) as {
          imageSrc: string;
          title: string;
          address: string;
          lat: number;
          lng: number;
        }[];

        setSearchResults((prevResults) => [...prevResults, ...formattedResults]);

        if (pagination && pagination.hasNextPage) {
          pagination.nextPage();
        }
      }
    });
  };

  const handleZoomIn = () => {
    if (mapRef.current && currentZoom < 18) {
      const newZoom = currentZoom + 1;

      setCurrentZoom(newZoom);
      mapRef.current.setZoom(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current && currentZoom > 4) {
      const newZoom = currentZoom - 1;

      setCurrentZoom(newZoom);
      mapRef.current.setZoom(newZoom);
    }
  };

  const getPolylinePath = () => {
    const confirmedMarkers = markers
      .filter((marker) => marker.isConfirmed)
      .sort((a, b) => (a.index || 0) - (b.index || 0));

    return confirmedMarkers.map((marker) => ({
      lat: marker.lat,
      lng: marker.lng,
    }));
  };

  const addMarker = useCallback(
    (newMarker: {
      lat: number;
      lng: number;
      title?: string;
      address?: string;
      imageSrc?: string;
    }) => {
      setMarkers((prevMarkers) => {
        const markerExists = prevMarkers.some(
          (marker) => marker.lat === newMarker.lat && marker.lng === newMarker.lng
        );

        if (markerExists) {
          return prevMarkers.map((marker) =>
            marker.lat === newMarker.lat && marker.lng === newMarker.lng
              ? { ...marker, ...newMarker }
              : marker
          );
        }

        return [...prevMarkers, newMarker];
      });
    },
    [setMarkers]
  );

  const handleResultClick = useCallback(
    (lat: number, lng: number, title: string, address: string, imageSrc: string) => {
      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng });
        addMarker({ lat, lng, title, address, imageSrc });
        setSelectedMarker({ lat, lng, title, address, imageSrc });
        setActiveMarker(null);
        setIsSearchVisible(false);
      }
    },
    [mapRef, addMarker]
  );

  return (
    <Container>
      <SearchContainer>
        <SearchBar onSearch={handleSearch} />
      </SearchContainer>
      <ZoomContainer>
        <ZoomScreen
          currentZoom={currentZoom}
          minZoom={4}
          maxZoom={18}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
      </ZoomContainer>
      {isLoaded ? (
        <MapContainer>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={currentZoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={mapOptions}
            onClick={handleModalClose}>
            <Polyline
              path={getPolylinePath()}
              options={{
                strokeColor: "#323232",
                strokeOpacity: 0,
                strokeWeight: 2,
                icons: [
                  {
                    icon: { path: "M 0,-1 0,1", strokeOpacity: 1 },
                    offset: "0",
                    repeat: "10px",
                  },
                ],
              }}
            />
            {markers.map((marker, index) => (
              <OverlayView key={index} position={marker} mapPaneName="floatPane">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!marker.isConfirmed) {
                      handleMarkerClick(marker, index);
                    }
                  }}
                  style={{ transform: "translate(-20px, -100%)" }}>
                  {marker.isConfirmed ? (
                    <ConfirmedMarker index={marker.index!} size={50} />
                  ) : (
                    <NormalMarker
                      profileImage="https://via.placeholder.com/150"
                      size={28}
                      profileSize={28}
                      isSelected={activeMarker === index}
                    />
                  )}
                </div>
              </OverlayView>
            ))}
          </GoogleMap>
          {selectedMarker && (
            <DetailsWrapper onClick={(e) => e.stopPropagation()}>
              <NormalMarkerDetails
                title={selectedMarker?.title || "No Name"}
                address={selectedMarker?.address || "No Address"}
                imageSrc={selectedMarker?.imageSrc || "https://via.placeholder.com/100x70"}
                onDelete={() => {
                  setMarkers((prev) =>
                    prev.filter(
                      (marker) =>
                        marker.lat !== selectedMarker?.lat || marker.lng !== selectedMarker?.lng
                    )
                  );
                  handleModalClose();
                }}
                onConfirm={handleConfirm}
              />
            </DetailsWrapper>
          )}
        </MapContainer>
      ) : (
        <div>로딩 중...</div>
      )}
      {isSearchVisible && searchResults.length > 0 && (
        <ResultsContainer>
          <SearchResultList
            results={searchResults}
            onResultClick={(lat, lng, title, address, imageSrc) =>
              handleResultClick(lat, lng, title, address, imageSrc)
            }
          />
        </ResultsContainer>
      )}
    </Container>
  );
};

export default React.memo(MapComponent);

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 40px;
  z-index: 10;
`;

const ZoomContainer = styled.div`
  position: absolute;
  bottom: 25px;
  right: 25px;
  z-index: 10;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ResultsContainer = styled.div`
  position: absolute;
  top: 90px;
  left: 40px;
  z-index: 10;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
`;

const DetailsWrapper = styled.div`
  position: fixed;
  bottom: 25px;
  left: 40px;
`;
