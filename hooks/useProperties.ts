import { useInfiniteQuery } from "@tanstack/react-query";
import { GetPropertiesParams, PropertiesResponse } from "@/types/property";
import { getPropertiesAction } from "@/server-actions/property.actions";

export const useProperties = (params: GetPropertiesParams, initialData?: PropertiesResponse) => {
  return useInfiniteQuery({
    queryKey: ["properties", params],

    queryFn: ({ pageParam }) =>
      getPropertiesAction({
        ...params,
        cursor: pageParam as string | undefined,
      }),

    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor;
    },
    
    ...(initialData && {
      initialData: {
        pages: [initialData],
        pageParams: [undefined],
      },
    }),
  });
};