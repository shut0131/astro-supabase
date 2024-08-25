import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const json = await request.json();
  const recreation_id = json["recreation_id"]?.toString();
  const {data:{user}} = await supabase.auth.getUser();
  if (!user) {
    return new Response("Not found user", { status: 400 });
  }


  const {data, error } = await supabase
  .from("rooms")
  .insert({
    recreation_id,
    created_user: user.id,
  })
  .returns()
  .select("room_id")
  .single()

  if (error) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }

  const room_id = data.room_id as string;
  if(!room_id) {
    return new Response("Failed to create room", { status: 500 });
  }

  return new Response(JSON.stringify({ recreation_id, room_id }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
