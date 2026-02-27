import {useRouter} from "expo-router";
import {AdditionConfig, FlashMultiplyConfig, WakoTableGameConfig} from "@types";


const useNavigationManager = () => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    const goToAdditionSettings = () => {
        router.push('/addition-settings');
    };

    const goToFlashMultiplySettings = () => {
        router.push('/flash-multiply-settings');
    };

    const goToWakoTableSettings = () => {
        router.push('/wako-table-settings');
    };

    const goToAdditionGame = (config: AdditionConfig) => {
        router.push({
            pathname:'/addition-game',
            params:{
                addends: config.addends.join(','),
                maxAddend: String(config.maxAddend),
                clockMode: config.clockMode,
                problemType: config.problemType,
            },
        });
    };

    const goToWakoTableGame = (config: WakoTableGameConfig) => {
        router.push({
            pathname:'/wako-table-game',
            params:{
                tableNumber: String(config.tableNumber),
                problemType: config.problemType,
                clockMode: config.clockMode,
            },
        });
    };

    const goToFlashMultiplyGame = (config: FlashMultiplyConfig) => {
        router.push({
            pathname:'/flash-multiply-game',
            params:{
                timetables: config.timetables.join(','),
                maxMultiplier: String(config.maxMultiplier),
                clockMode: config.clockMode,
                problemType: config.problemType,
            },
        });
    };

    const goToStats = () => {
        router.push('/stats');
    }

    return {
        goBack,
        goToAdditionSettings,
        goToAdditionGame,
        goToWakoTableSettings,
        goToFlashMultiplySettings,
        goToWakoTableGame,
        goToFlashMultiplyGame,
        goToStats
    }

}

export default useNavigationManager;