export async function marcarAsistenciaQr(
  codigoQr: string,
) {
  const response = await fetch(
    'https://factsheet-purplish-rendition.ngrok-free.dev/api/asistencias/marcar-qr',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({
        codigo_qr: codigoQr,
        dispositivo_id: 1,
      }),
    },
  );

  const texto = await response.text();

  console.log('STATUS:', response.status);
  console.log('RESPUESTA:', texto);

  let data: any;

  try {
    data = JSON.parse(texto);
  } catch {
    throw new Error(
      `Respuesta inválida del servidor: ${texto}`,
    );
  }

  if (!response.ok) {
    throw new Error(
      data.detail || 'Error al registrar asistencia',
    );
  }

  return data;
}
