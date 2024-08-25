import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Question {
  id: number;
  content: string;
  answer: string;
}

const JumonDeSuiri: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from('jumon_de_suiri_questions')
      .select('*')
      .eq('room_id', roomId)
      .limit(10);

    if (error) {
      console.error('質問の取得に失敗しました:', error);
    } else {
      setQuestions(data || []);
    }
  };

  const handleSubmit = () => {
    if (currentQuestion >= questions.length) return;

    const currentQuestionData = questions[currentQuestion];
    if (userAnswer.toLowerCase() === currentQuestionData?.answer.toLowerCase()) {
      setScore(score + 1);
      setResult('正解です！');
    } else {
      setResult(`不正解です。正解は「${currentQuestionData?.answer}」でした。`);
    }

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
        setResult('');
      }, 2000);
    } else {
      setResult(`ゲーム終了！あなたのスコアは ${score + 1} / 10 です。`);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">呪文で推理</h2>
      {questions.length > 0 && currentQuestion < questions.length ? (
        <div>
          <p className="mb-2">質問 {currentQuestion + 1} / 10:</p>
          <p className="mb-4">{questions[currentQuestion]?.content}</p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="border p-2 rounded w-full mb-4"
            placeholder="答えを入力してください"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            回答する
          </button>
        </div>
      ) : (
        <p>質問を読み込んでいます...</p>
      )}
      {result && <p className="mt-4 text-lg font-semibold">{result}</p>}
    </div>
  );
};

export default JumonDeSuiri;
