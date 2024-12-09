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
import { MarkerData, useMapMarkers } from "../hooks/useWebSocketMapMarkers";
import { useTypedParams } from "@common/hooks/useTypedParams";
import { ROUTES } from "@routes/type";

const MapComponent = () => {
  const { roomId } = useTypedParams<typeof ROUTES.PLANNER>();

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
    useMapMarkers(roomId);

  const [localMarkers, setLocalMarkers] = useState<MarkerData[]>([]);
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
  const [scheduleId, setScheduleId] = useState<number>(1);

  useEffect(() => {
    if (isConnected) {
      requestMarkerList(scheduleId);
    }
  }, [isConnected, requestMarkerList, scheduleId]);

  useEffect(() => {
    setLocalMarkers(markers);
  }, [markers]);

  const onUnmount = () => {
    mapRef.current = null;
  };

  const handleMarkerClick = useCallback(
    async (marker: MarkerData, index: number) => {
      setIsSearchVisible(false);
      setSelectedMarker(marker);
      setActiveMarker(index);

      if (!geocoderRef.current || !mapRef.current) return;

      const location = { lat: marker.lat, lng: marker.lng };

      try {
        const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoderRef.current!.geocode({ location }, (res, status) => {
            if (status === "OK" && res) resolve(res);
            else reject(status);
          });
        });

        if (results.length > 0) {
          const address = results[0].formatted_address;
          const service = new window.google.maps.places.PlacesService(mapRef.current!);
          const placeResults = await new Promise<google.maps.places.PlaceResult[]>(
            (resolve, reject) => {
              const request = {
                location,
                radius: 50,
                type: "point_of_interest",
              };

              service.nearbySearch(request, (res, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && res) {
                  resolve(res);
                } else {
                  reject(status);
                }
              });
            }
          );

          let title = "Unnamed Place";
          let imageSrc = NoImage;

          if (placeResults.length > 0) {
            const place = placeResults[0];

            title = place.name || "Unnamed Place";
            imageSrc = place.photos?.[0]?.getUrl({ maxWidth: 100 }) || NoImage;
          }

          setSelectedMarker({
            ...marker,
            title,
            address,
            imageSrc,
          });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch location details:", error);
      }
    },
    [geocoderRef, mapRef]
  );

  const handleModalClose = useCallback(() => {
    setSelectedMarker(null);
    setActiveMarker(null);
    setIsSearchVisible(false);
  }, []);

  const isMarkerExists = useCallback(
    (lat: number, lng: number) => {
      return localMarkers.some(
        (marker) => Math.abs(marker.lat - lat) < 0.0001 && Math.abs(marker.lng - lng) < 0.0001
      );
    },
    [localMarkers]
  );

  // const fetchLocationDetails = useCallback(
  //   async (lat: number, lng: number) => {
  //     if (!geocoderRef.current || !mapRef.current) return;

  //     const location = { lat, lng };

  //     try {
  //       const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
  //         geocoderRef.current!.geocode({ location }, (res, status) => {
  //           if (status === "OK" && res) resolve(res);
  //           else reject(status);
  //         });
  //       });

  //       if (results.length > 0) {
  //         const address = results[0].formatted_address;
  //         const service = new window.google.maps.places.PlacesService(mapRef.current!);
  //         const placeResults = await new Promise<google.maps.places.PlaceResult[]>(
  //           (resolve, reject) => {
  //             const request = {
  //               location,
  //               radius: 10,
  //               type: "point_of_interest",
  //             };

  //             service.nearbySearch(request, (res, status) => {
  //               if (status === window.google.maps.places.PlacesServiceStatus.OK && res) {
  //                 resolve(res);
  //               } else {
  //                 reject(status);
  //               }
  //             });
  //           }
  //         );

  //         let title = "Unnamed Place";
  //         let imageSrc = NoImage;

  //         if (placeResults.length > 0) {
  //           const place = placeResults[0];

  //           title = place.name || "Unnamed Place";
  //           imageSrc = place.photos?.[0]?.getUrl({ maxWidth: 100 }) || NoImage;
  //         }

  //         setLocalMarkers((prevMarkers) => [
  //           ...prevMarkers,
  //           {
  //             markerId: Date.now(),
  //             lat,
  //             lng,
  //             confirm: false,
  //             itemOrder: prevMarkers.length + 1,
  //             title,
  //             address,
  //             imageSrc,
  //             email: "",
  //             profileImage: "",
  //             scheduleId,
  //             color: "",
  //             createdAt: new Date().toISOString(),
  //             updatedAt: new Date().toISOString(),
  //           },
  //         ]);
  //       }
  //     } catch (error) {
  //       // eslint-disable-next-line no-console
  //       console.error("Failed to fetch location details:", error);
  //     }
  //   },
  //   [geocoderRef, mapRef, scheduleId]
  // );

  const addNewMarker = useCallback(
    async (scheduleId: number, lat: number, lng: number) => {
      if (isMarkerExists(lat, lng)) {
        alert("이미 마커가 있는 위치입니다.");

        return;
      }

      if (!geocoderRef.current || !mapRef.current) return;

      try {
        const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoderRef.current!.geocode({ location: { lat, lng } }, (res, status) => {
            if (status === "OK" && res) resolve(res);
            else reject(status);
          });
        });

        if (results.length > 0) {
          const address = results[0].formatted_address;
          const service = new window.google.maps.places.PlacesService(mapRef.current);

          const placeResults = await new Promise<google.maps.places.PlaceResult[]>(
            (resolve, reject) => {
              const request = {
                location: { lat, lng },
                radius: 50,
                type: "point_of_interest",
              };

              service.nearbySearch(request, (res, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && res) {
                  resolve(res);
                } else {
                  reject(status);
                }
              });
            }
          );

          let title = "Unnamed Place";
          let imageSrc = NoImage;

          if (placeResults.length > 0) {
            const place = placeResults[0];

            title = place.name || "Unnamed Place";
            imageSrc = place.photos?.[0]?.getUrl({ maxWidth: 100 }) || NoImage;
          }

          await addMarker(scheduleId, lat, lng);

          const newMarker: MarkerData = {
            markerId: Date.now(),
            lat,
            lng,
            confirm: false,
            itemOrder: localMarkers.length + 1,
            email: "",
            profileImage: "",
            scheduleId,
            color: "000000",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          setLocalMarkers((prevMarkers) => [...prevMarkers, newMarker]);
          setSelectedMarker({ lat, lng, title, address, imageSrc });
          setActiveMarker(localMarkers.length);
        }
      } catch {
        setLocalMarkers((prevMarkers) => prevMarkers.filter((m) => m.markerId !== Date.now()));
      }
    },
    [addMarker, localMarkers, geocoderRef, mapRef, isMarkerExists]
  );

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      geocoderRef.current = new window.google.maps.Geocoder();

      map.addListener("rightclick", async (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();

          if (!isMarkerExists(lat, lng)) {
            await addNewMarker(scheduleId, lat, lng);
          }
        }
      });
    },
    [scheduleId, addNewMarker, isMarkerExists]
  );

  const handleConfirm = useCallback(async () => {
    if (selectedMarker) {
      const markersToConfirm = localMarkers.filter(
        (m) => m.lat === selectedMarker.lat && m.lng === selectedMarker.lng
      );

      try {
        for (const marker of markersToConfirm) {
          await updateMarker(marker.markerId, true);
        }

        const confirmedCount = localMarkers.filter((m) => m.confirm).length;

        setLocalMarkers((prevMarkers) =>
          prevMarkers.map((m) =>
            markersToConfirm.includes(m)
              ? {
                  ...m,
                  confirm: true,
                  itemOrder: confirmedCount + 1,
                  title: selectedMarker.title,
                  address: selectedMarker.address,
                  imageSrc: selectedMarker.imageSrc,
                }
              : m
          )
        );
        handleModalClose();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to confirm marker:", error);
      }
    }
  }, [selectedMarker, localMarkers, updateMarker, handleModalClose]);

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
    const confirmedMarkers = localMarkers
      .filter((marker) => marker.confirm)
      .sort((a, b) => a.itemOrder - b.itemOrder);

    return confirmedMarkers.map((marker) => ({
      lat: marker.lat,
      lng: marker.lng,
    }));
  };

  const handleResultClick = useCallback(
    async (lat: number, lng: number) => {
      if (isMarkerExists(lat, lng)) {
        alert("이미 마커가 있는 위치입니다.");

        return;
      }

      if (!geocoderRef.current || !mapRef.current) return;

      try {
        const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoderRef.current!.geocode({ location: { lat, lng } }, (res, status) => {
            if (status === "OK" && res) resolve(res);
            else reject(status);
          });
        });

        if (results.length > 0) {
          const address = results[0].formatted_address;
          const service = new window.google.maps.places.PlacesService(mapRef.current);

          const placeResults = await new Promise<google.maps.places.PlaceResult[]>(
            (resolve, reject) => {
              const request = {
                location: { lat, lng },
                radius: 50,
                type: "point_of_interest",
              };

              service.nearbySearch(request, (res, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && res) {
                  resolve(res);
                } else {
                  reject(status);
                }
              });
            }
          );

          let title = "Unnamed Place";
          let imageSrc = NoImage;

          if (placeResults.length > 0) {
            const place = placeResults[0];

            title = place.name || "Unnamed Place";
            imageSrc = place.photos?.[0]?.getUrl({ maxWidth: 100 }) || NoImage;
          }

          const newMarker: MarkerData = {
            markerId: Date.now(),
            lat,
            lng,
            confirm: false,
            itemOrder: localMarkers.length + 1,
            title,
            address,
            imageSrc,
            email: "",
            profileImage: imageSrc,
            scheduleId,
            color: "#ff0000", // 기본 색상 설정
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          // 서버에 마커 추가
          await addMarker(scheduleId, lat, lng);

          // 로컬 상태 업데이트
          setLocalMarkers((prevMarkers) => [...prevMarkers, newMarker]);
          setSelectedMarker({ lat, lng, title, address, imageSrc });
          setActiveMarker(localMarkers.length);
          setIsSearchVisible(false);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to add marker:", error);
        setLocalMarkers((prevMarkers) => prevMarkers.filter((m) => m.markerId !== Date.now()));
      }
    },
    [addMarker, localMarkers, geocoderRef, mapRef, scheduleId, isMarkerExists]
  );

  const handleDelete = useCallback(async () => {
    if (selectedMarker) {
      const markerToDelete = localMarkers.find(
        (m) => m.lat === selectedMarker.lat && m.lng === selectedMarker.lng
      );

      if (markerToDelete) {
        try {
          await deleteMarker(markerToDelete.markerId);
          setLocalMarkers((prevMarkers) =>
            prevMarkers.filter((m) => m.markerId !== markerToDelete.markerId)
          );
          setSelectedMarker(null);
          setActiveMarker(null);
        } catch {
          setLocalMarkers((prevMarkers) => [...prevMarkers, markerToDelete]);
        }
      }
    }
  }, [selectedMarker, localMarkers, deleteMarker]);

  const handleScheduleIdChange = useCallback(
    (newScheduleId: number) => {
      setScheduleId(newScheduleId);
      requestMarkerList(newScheduleId);
    },
    [requestMarkerList]
  );

  return (
    <Container>
      <MapSection>
        <OverlayContainer>
          <ScheduleManager onScheduleIdChange={handleScheduleIdChange} />
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
                localMarkers.length > 0 &&
                localMarkers.map((marker, index) => (
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
                      style={{ transform: "translate(-20px, -90%)" }}>
                      {marker.confirm ? (
                        <ConfirmedMarker index={marker.itemOrder || 1} size={50} />
                      ) : (
                        <NormalMarker
                          profileImage={marker.profileImage || NoImage}
                          size={28}
                          profileSize={28}
                          isSelected={activeMarker === index}
                          color={marker.color}
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
              onResultClick={(lat, lng) => handleResultClick(lat, lng)}
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
