import {useRouter} from "expo-router";


const useNavigationManager = () => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    const goToFlashMultiplyGame = () => {
        router.push('/flash-multiply');
    };

    return {
        goBack,
        goToFlashMultiplyGame
    }

}

export default useNavigationManager;