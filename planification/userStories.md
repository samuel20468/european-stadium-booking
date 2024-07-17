# Historias de Usuario para la Aplicación de Gestión de Turnos

## Creación de Cuenta e Inicio de Sesión

- Como usuario nuevo, quiero poder crear una cuenta en la aplicación.
  - Quiero poder completar un formulario con todos mis datos para registrarme.
  - Después del registro, quiero poder iniciar sesión con las credenciales que acabo de crear.

## Reserva y Gestión de Turnos

- Como usuario registrado, quiero poder reservar un turno para la temática destinada.
  - Quiero poder elegir la fecha y hora de mi turno dentro del horario de atención establecido.
  - Después de reservar un turno, quiero que se confirme mi reserva y se refleje en mi lista de turnos activos.
  - Quiero poder cancelar un turno reservado.
    - Después de cancelar un turno, quiero que se mueva a un contenedor de "Turnos Cancelados".
    - Desde el contenedor de "Turnos Cancelados", quiero tener la opción de eliminar definitivamente un turno cancelado.

## Visualización de Turnos

- Como usuario registrado, quiero poder visualizar mis turnos activos y cancelados de forma separada.
  - Quiero ver una lista de mis turnos activos con detalles como fecha, hora y lugar.
  - Quiero ver una lista de mis turnos cancelados con la opción de eliminarlos definitivamente.

## Actualización Automática de Estado de los Turnos

- Como usuario registrado, quiero que el estado de mis turnos cambie automáticamente cuando pasen la fecha y hora del turno.
  - Quiero que un turno activo cambie a "Fulfillled" una vez que pase su fecha y hora programadas.

## Cierre de Sesión

- Como usuario en sesión, quiero poder cerrar sesión de forma intuitiva.
  - Quiero encontrar fácilmente la opción para cerrar sesión en la aplicación.

## Extra Credits
- Como usuario, quiero recibir una confirmación por correo electrónico después de reservar o cancelar un turno.
- Como usuario, quiero poder agregar una foto de perfil a mi cuenta cargando un archivo de imagen.