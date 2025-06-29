import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";

export const useActivities = (id?: string) => {
    const queryClient = useQueryClient();
    const location= useLocation();
    const { data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        },
        //staleTime: 1000 * 60 * 5  //staletime is one approacl for caching so the Progress bar doesnt show in each call
        enabled: !id && location.pathname === '/activities' // This query will be enabled when we call it explicitly
    });

    const {data: activity, isLoading: isLoadingActivity}
    = useQuery({
            queryKey: ['activity', id],
            queryFn: async () => {
                const response = await agent.get<Activity>(`/activities/${id}`);
                return response.data;
            },
            enabled: !!id // This query will be enabled when we call it explicitly
        });

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put(`/activities/${activity.id}`, activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            });
        }
    }) 

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            const response = await agent.post(`/activities`, activity);
            return response.data; // Assuming the API returns the created activity's ID
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            });
        }
    }) 

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            });
        }
    }) 

    return {
        activities,
        isPending,
        updateActivity,
        createActivity,
        deleteActivity,
        activity,
        isLoadingActivity
    };
}