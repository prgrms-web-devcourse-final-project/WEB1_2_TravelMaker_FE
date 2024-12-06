import React, { createContext, useContext, useState, useEffect } from "react";

interface UserProfile {
  profileImage: string | null;
}

interface UserContextProps {
  profile: UserProfile | null;
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
  refreshProfile: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileImage, setProfileImageState] = useState<string | null>(null);

  useEffect(() => {
    refreshProfile();
  }, []);

  const refreshProfile = () => {
    const fetchedProfile: UserProfile = {
      profileImage: localStorage.getItem("profileImage") || null,
    };

    setProfile(fetchedProfile);
    setProfileImageState(fetchedProfile.profileImage);
  };

  const setProfileImage = (image: string | null) => {
    setProfileImageState(image);
    localStorage.setItem("profileImage", image || "");
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        profileImage,
        setProfileImage,
        refreshProfile,
      }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
