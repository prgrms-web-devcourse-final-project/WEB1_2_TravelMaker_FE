import React, { useRef, useState } from "react";
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
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<
    {
      lat: number;
      lng: number;
      isConfirmed?: boolean;
      index?: number;
    }[]
  >([]);
  const [selectedMarker, setSelectedMarker] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<
    {
      title: string;
      address: string;
      imageSrc: string;
    }[]
  >([]);
  const [currentZoom, setCurrentZoom] = useState(10);
  const [mapCenter] = useState(initialCenter);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    map.addListener("rightclick", (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newMarker = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };

        const markerExists = markers.some(
          (marker) => marker.lat === newMarker.lat && marker.lng === newMarker.lng
        );

        if (!markerExists) {
          setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        }
      }
    });
  };

  const onUnmount = () => {
    mapRef.current = null;
  };

  const handleMarkerClick = (marker: { lat: number; lng: number }, index: number) => {
    setSelectedMarker(marker);
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
    if (!query.trim()) return;

    const results = [
      {
        title: `${query} - 장소 1`,
        address: "서울특별시 강남구",
        imageSrc: "https://via.placeholder.com/150",
      },
      {
        title: `${query} - 장소 2`,
        address: "서울특별시 종로구",
        imageSrc: "https://via.placeholder.com/150",
      },
      {
        title: `${query} - 장소 3`,
        address: "서울특별시 마포구",
        imageSrc: "https://via.placeholder.com/150",
      },
    ];

    setSearchResults(results);
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
                title="마커 제목"
                address="서울특별시 종로구"
                imageSrc="https://via.placeholder.com/150"
                onDelete={() => {
                  setMarkers((prev) =>
                    prev.filter(
                      (marker) =>
                        marker.lat !== selectedMarker.lat || marker.lng !== selectedMarker.lng
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
      {searchResults.length > 0 && (
        <ResultsContainer>
          <SearchResultList results={searchResults} />
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
  left: 20px;
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
