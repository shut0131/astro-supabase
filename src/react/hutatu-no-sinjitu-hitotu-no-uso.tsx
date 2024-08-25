import { createClient } from '@supabase/supabase-js';
import React, { useState } from 'react';
import { useRecreationBase } from './hooks/useRecreationBase';

interface Statement {
  id: number;
  content: string;
  isTrue: boolean;
}

interface Props {
  roomId: string;
}

const HutatuNoSinjituHitotuNoUso: React.FC<Props> = ({ roomId }) => {

  const [selectedStatement, setSelectedStatement] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const supabase = createClient(
    // import.meta.env.SUPABASE_URL,
    // import.meta.env.SUPABASE_ANON_KEY,
    "https://xhjnsfeehdrnbcddxehu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhoam5zZmVlaGRybmJjZGR4ZWh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzNzkxMjUsImV4cCI6MjAzODk1NTEyNX0.LSzc3POzyMWwJCnxZGSRiWU7nwGwi6hsNazz38EhNUI",
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: true,
      },
    },
  );

  const handleSelect = (id: number) => {
    setSelectedStatement(id);
  };

  const handleSubmit = () => {
    // if (selectedStatement === null) return;

    // const selectedStmt = statements.find(stmt => stmt.id === selectedStatement);
    // if (selectedStmt) {
    //   setResult(selectedStmt.isTrue ? '正解です！' : '不正解です。');
    // }
  };

//   supabase
//   .channel('todos')
//   .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'todos', }, handleInserts)
//   .subscribe()

  const {player}= useRecreationBase({supabase,roomId,})

  return (
    <div className="p-4">
        {player.displayName}さん 
      <h2 className="text-2xl font-bold mb-4">二つの真実一つの嘘</h2>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        選択を確定
      </button>
      {result && <p className="mt-4 text-lg font-semibold">{result}</p>}
    </div>
  );
};

export default HutatuNoSinjituHitotuNoUso;
