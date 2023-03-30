import useSwr from 'swr'
import { fetcher } from '@/lib';

const useBillboard = () => {
    const { data, error, isLoading } = useSwr('/api/random', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    return {
        data,
        error,
        isLoading
    }
};

export default useBillboard;