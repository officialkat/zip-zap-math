import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlashMultiplyGameStats} from "@types";
import {Game} from "@enums";



export const getGameStats = async (game: Game) => {
    try {
        const jsonValue = await AsyncStorage.getItem(game);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error("Error getting flash multiply game state:", e);
    }
}


export const saveFlashMultiplyGameStats = async (stats: FlashMultiplyGameStats) => {

    try {
        await AsyncStorage.setItem(Game.FLASH_MULTIPLY, JSON.stringify(stats));
    } catch (e) {
        // saving error
        console.error("Error saving flash multiply game state:", e);
    }
}