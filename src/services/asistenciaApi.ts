export async function marcarAsistenciaQr(
  codigoQr: string,
) {
  const response = await fetch(
    'https://factsheet-purplish-rendition.ngrok-free.dev/api/asistencias/marcar-qr',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({
        codigo_qr: "DOC003",
        dispositivo_id: 1,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.detail || 'Error al registrar asistencia');
  }

  return data;
}