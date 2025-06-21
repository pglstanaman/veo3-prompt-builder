import React, { useState } from 'react';

export default function PromptBuilder() {
  const [dialog, setDialog] = useState('');
  const [sceneType, setSceneType] = useState('Skydiving');
  const [prompt, setPrompt] = useState('');
  const [errorFeedback, setErrorFeedback] = useState('');
  const [correctionPrompt, setCorrectionPrompt] = useState('');

  const generatePrompt = () => {
    const basePrompt = `A highly realistic and cinematic ${sceneType.toLowerCase()} scene.\n` +
      `Inside a military cargo plane flying low over a modern sugar factory (PG Lestari), three Indonesian male paratroopers (Character_A, Character_B, Character_C) stand at the open door. They wear full military uniforms, black helmets, and olive green parachute packs with \"PG LESTARI\" printed in white.\n\n` +
      `1. Show all three standing at the door.\n` +
      `2. Character_C speaks in fluent Indonesian: \"${dialog}\" Ensure full lipsync. Spoken only — do not show as text.\n` +
      `3. Character_A jumps, stretches arms, pulls parachute cord visibly, then parachute opens.\n` +
      `4. Same sequence follows for Character_B and Character_C.\n` +
      `5. Each parachute is olive green, labeled \"PG LESTARI,\" and used by one person only.\n\n` +
      `🛑 Do not display any on-screen text, subtitles, or floating words. Only visible text is on parachute fabric.\n` +
      `Use ambient sound only (wind, jet, parachute).\n` +
      `Characters must remain visually consistent, Indonesian male faces.\n` +
      `Show realistic motion and accurate sequence from jump to deployment.`;

    setPrompt(basePrompt);
  };

  const handleFeedback = () => {
    const newPrompt = `${prompt}\n\n// Feedback Correction:\n// ${errorFeedback}`;
    setCorrectionPrompt(newPrompt);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Veo3 Prompt Builder</h1>

      <div>
        <label className="font-semibold">Dialog (Character_C)</label>
        <textarea
          className="w-full border p-2 rounded"
          rows={3}
          value={dialog}
          onChange={(e) => setDialog(e.target.value)}
          placeholder="Contoh: Lestari tak hanya nama, tapi cita dan kerja nyata."
        />
      </div>

      <div>
        <label className="font-semibold">Scene Type</label>
        <select
          className="w-full border p-2 rounded"
          value={sceneType}
          onChange={(e) => setSceneType(e.target.value)}
        >
          <option>Skydiving</option>
          <option>Field Harvest</option>
          <option>Ceremony</option>
        </select>
      </div>

      <button
        onClick={generatePrompt}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        Hasilkan Prompt
      </button>

      {prompt && (
        <div className="mt-4">
          <h2 className="font-semibold">Prompt Siap Pakai:</h2>
          <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">{prompt}</pre>
        </div>
      )}

      {prompt && (
        <div className="mt-4">
          <label className="font-semibold">Ada kesalahan? Jelaskan di sini:</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={2}
            value={errorFeedback}
            onChange={(e) => setErrorFeedback(e.target.value)}
            placeholder="Contoh: parasut terbuka tanpa menarik tali"
          />
          <button
            onClick={handleFeedback}
            className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Perbaiki Prompt Berdasarkan Masukan
          </button>
        </div>
      )}

      {correctionPrompt && (
        <div className="mt-4">
          <h2 className="font-semibold">Prompt Setelah Perbaikan:</h2>
          <pre className="bg-green-100 p-3 rounded whitespace-pre-wrap">{correctionPrompt}</pre>
        </div>
      )}
    </div>
  );
}