// 응답 타입 추출
export type ApiResponse<T> = T extends {
  responses: {
    200: {
      content: {
        "*/*": infer U;
      };
    };
  };
}
  ? U
  : T extends {
        responses: {
          200: {
            content: {
              "application/json": infer U;
            };
          };
        };
      }
    ? U
    : never;

// 요청 타입 추출
export type ApiRequest<T> = T extends {
  requestBody: {
    content: {
      "application/json": infer U;
    };
  };
}
  ? U
  : never;
