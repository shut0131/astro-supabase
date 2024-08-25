import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { getCookieValue } from "../../lib/cookie";

type Player = {
    playerId: string;
    displayName:string;
}

export const useRecreationBase =  ({supabase,roomId}:{supabase: SupabaseClient<any, "public", any> , roomId:string})=>{
    const [player,setPlayer]= useState({playerId:"",displayName:""})
    useEffect(()=>{
        (async()=>{
            const playerId = getCookieValue("playerId")
            const displayName = getCookieValue("displayName")
            if(playerId && displayName){
                setPlayer({playerId,displayName})
    
            }else{
                const newPlayerId = crypto.randomUUID()
                let newDisplayName = prompt("プレイヤー名を入力してください")
                while(!newDisplayName){
                    newDisplayName = prompt("レクリエーションに参加するには、表示名が必須です")
                }
                
                try{
                     const res = await supabase
                    .from("players")
                    .insert({player_id:newPlayerId, display_name:newDisplayName ,room_id:roomId})
    
                    console.log(res)
     
                    document.cookie = `playerId=${newPlayerId}`
                    document.cookie = `displayName=${displayName  || newDisplayName}`
                    console.log(document.cookie)
                    setPlayer({ playerId:newPlayerId , displayName:displayName  || newDisplayName})
    
    
                }catch{
    
                }
    
            }
        })()


    },[])

    return {player}
}