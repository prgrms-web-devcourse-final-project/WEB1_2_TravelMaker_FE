import styled from "styled-components";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, OverlayView, Polyline } from "@react-google-maps/api";

import { calcResponsive } from "@common/styles/theme";
import NormalMarker from "@components/normalmarker/NormalMarker";
import NormalMarkerDetails from "@components/markerdetails/NormalMarkerDetails";
import ConfirmedMarker from "@components/confirmedmarker/ConfirmedMarker";
import SearchBar from "@components/search/SearchBar";
import SearchResultList from "@components/searchresultlist/SearchResultList";
import ZoomScreen from "@components/zoomscreen/ZoomScreen";
import NoImage from "@components/assets/images/NoImage.svg";
import ScheduleManager from "./ScheduleManager";
import PlannerSettingContainer from "../containers/PlannerSettingContainer";
import ChatContainer from "../containers/ChatContainer";
import { useMapMarkers } from "../hooks/useWebSocketMapMarkers";

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

  const { markers, addMarker, updateMarker, deleteMarker, requestMarkerList, isConnected } =
    useMapMarkers("roomId");

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
  const [scheduleId, setScheduleId] = useState(0);

  useEffect(() => {
    if (isConnected) {
      requestMarkerList(scheduleId);
    }
  }, [isConnected, requestMarkerList, scheduleId]);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    geocoderRef.current = new window.google.maps.Geocoder();

    map.addListener("rightclick", (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newMarker = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        addMarker(scheduleId, newMarker.lat, newMarker.lng);
        fetchLocationDetails(newMarker.lat, newMarker.lng);
        setScheduleId((prevId) => prevId + 1);
      }
    });
  };

  const fetchLocationDetails = async (lat: number, lng: number) => {
    if (!geocoderRef.current || !mapRef.current) return;

    const location = { lat, lng };

    try {
      const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoderRef.current!.geocode({ location }, (res, status) => {
          if (status === "OK" && res) resolve(res);
          else reject(status);
        });
      });

      if (results.length > 0) {
        try {
          const placeResults = await new Promise<google.maps.places.PlaceResult[]>(
            (resolve, reject) => {
              const service = new window.google.maps.places.PlacesService(mapRef.current!);
              const placeRequest = {
                location,
                radius: 10,
                type: "point_of_interest",
                language: "ko",
              };

              service.nearbySearch(placeRequest, (res, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && res)
                  resolve(res);
                else reject(status);
              });
            }
          );

          if (placeResults.length > 0) {
            await addMarker(scheduleId, lat, lng);
          }
        } catch {
          await addMarker(scheduleId, lat, lng);
        }
      }
    } catch {
      await addMarker(scheduleId, lat, lng);
    }
  };

  const onUnmount = () => {
    mapRef.current = null;
  };

  const handleMarkerClick = useCallback(
    (marker: { lat: number; lng: number }, index: number) => {
      const clickedMarker = markers.find((m) => m.lat === marker.lat && m.lng === marker.lng);

      setIsSearchVisible(false);
      if (clickedMarker) {
        setSelectedMarker(clickedMarker);
      }
      setActiveMarker(index);
    },
    [markers]
  );

  const handleModalClose = () => {
    setSelectedMarker(null);
    setActiveMarker(null);
    setIsSearchVisible(false);
  };

  const handleConfirm = () => {
    if (selectedMarker) {
      const marker = markers.find(
        (m) => m.lat === selectedMarker.lat && m.lng === selectedMarker.lng
      );

      if (marker) {
        updateMarker(marker.markerId, true);
      }
    }
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
                : NoImage;

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

  const handleZoomChanged = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom();

      if (newZoom !== undefined && newZoom !== currentZoom) {
        setCurrentZoom(newZoom);
      }
    }
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      const newZoom = Math.min(currentZoom + 1, mapOptions.maxZoom || 18);

      setCurrentZoom(newZoom);
      mapRef.current.setZoom(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const newZoom = Math.max(currentZoom - 1, mapOptions.minZoom || 4);

      setCurrentZoom(newZoom);
      mapRef.current.setZoom(newZoom);
    }
  };

  const getPolylinePath = () => {
    const confirmedMarkers = markers
      .filter((marker) => marker.confirm)
      .sort((a, b) => a.itemOrder - b.itemOrder);

    return confirmedMarkers.map((marker) => ({
      lat: marker.lat,
      lng: marker.lng,
    }));
  };

  const handleResultClick = useCallback(
    (lat: number, lng: number, title: string, address: string, imageSrc: string) => {
      if (mapRef.current) {
        mapRef.current.panTo({ lat, lng });

        addMarker(scheduleId, lat, lng);
        setSelectedMarker({ lat, lng, title, address, imageSrc });
        setActiveMarker(markers.findIndex((marker) => marker.lat === lat && marker.lng === lng));
        setIsSearchVisible(false);
        setScheduleId((prevId) => prevId + 1);
      }
    },
    [mapRef, addMarker, markers, scheduleId]
  );

  const handleDelete = () => {
    if (selectedMarker) {
      const marker = markers.find(
        (m) => m.lat === selectedMarker.lat && m.lng === selectedMarker.lng
      );

      if (marker) {
        deleteMarker(marker.markerId);
        setScheduleId((prevId) => prevId - 1);
      }
    }
    handleModalClose();
  };

  return (
    <Container>
      <MapSection>
        <OverlayContainer>
          <ScheduleManager />
        </OverlayContainer>
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
              onZoomChanged={handleZoomChanged}
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
              {isLoaded &&
                mapRef.current &&
                markers.length > 0 &&
                markers.map((marker, index) => (
                  <OverlayView
                    key={marker.markerId}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    mapPaneName="floatPane">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!marker.confirm) {
                          handleMarkerClick(marker, index);
                        }
                      }}
                      style={{ transform: "translate(-50%, -100%)" }}>
                      {marker.confirm ? (
                        <ConfirmedMarker index={marker.itemOrder || 1} size={50} />
                      ) : (
                        <NormalMarker
                          profileImage={marker.profileImage || NoImage}
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
                  imageSrc={selectedMarker?.imageSrc || NoImage}
                  onDelete={handleDelete}
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
      </MapSection>
      <SettingSection>
        <PlannerSettingContainer />
      </SettingSection>
      <ChatSection>
        <ChatContainer />
      </ChatSection>
    </Container>
  );
};

export default React.memo(MapComponent);

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const MapSection = styled.div`
  flex: 1;
  position: relative;
`;

const OverlayContainer = styled.div`
  position: absolute;
  left: ${calcResponsive({ value: 260, dimension: "width" })};
  transform: translateX(-50%);
  z-index: 10;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: ${calcResponsive({ value: 25, dimension: "width" })};
  left: ${calcResponsive({ value: 560, dimension: "width" })};
  z-index: 10;
`;

const ZoomContainer = styled.div`
  position: absolute;
  bottom: ${calcResponsive({ value: 25, dimension: "width" })};
  right: ${calcResponsive({ value: 25, dimension: "width" })};
  z-index: 10;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const ResultsContainer = styled.div`
  position: absolute;
  top: ${calcResponsive({ value: 90, dimension: "width" })};
  left: ${calcResponsive({ value: 560, dimension: "width" })};
  z-index: 10;
`;

const DetailsWrapper = styled.div`
  position: fixed;
  bottom: ${calcResponsive({ value: 25, dimension: "width" })};
  left: ${calcResponsive({ value: 560, dimension: "width" })};
`;

const SettingSection = styled.div`
  position: absolute;
  top: ${calcResponsive({ value: 25, dimension: "width" })};
  right: ${calcResponsive({ value: 25, dimension: "width" })};
`;

const ChatSection = styled.div`
  position: absolute;
  top: ${calcResponsive({ value: 170, dimension: "width" })};
  right: ${calcResponsive({ value: 25, dimension: "width" })};
`;
