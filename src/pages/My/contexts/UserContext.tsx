import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchUserProfile } from "@api/my/member";

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

  const refreshProfile = useCallback(async () => {
    try {
      const data = await fetchUserProfile();

      setProfile(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("프로필 데이터를 불러오는데 실패했습니다:", error);
    }
  }, []);

  const setProfileImage = (image: string | null) => {
    setProfile((prev) => (prev ? { ...prev, profileImage: image } : null));
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        profileImage: profile?.profileImage || null,
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
