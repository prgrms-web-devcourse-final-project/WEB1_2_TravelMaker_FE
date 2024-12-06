import apiClient from "./index";

// 사용자 정보 타입 정의
export interface UserProfile {
  email: string;
  nickname: string;
  profileImage: string | null;
}

// 사용자 정보를 가져오는 API
export const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get<UserProfile>("/member");

  return response.data;
};

// 회원 탈퇴 API
export const deleteUserAccount = async (): Promise<void> => {
  await apiClient.delete("/member");
};

// 닉네임 업데이트 API
export const updateNickname = async (newNickname: string): Promise<string> => {
  const response = await apiClient.put<{ nickname: string }>("/member", {
    nickname: newNickname,
  });

  return response.data.nickname;
};

// 프로필 이미지 업데이트 API
export const updateProfileImage = async (file: File): Promise<UserProfile> => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await apiClient.put<UserProfile>("/member/profileImg", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
