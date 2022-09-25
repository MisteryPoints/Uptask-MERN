import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos
    
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    //Informacion Mail

    const info = await transport.sendMail({
        from: '"Uptask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "Uptask - Confirma tu cuenta",
        text: "Comprueba tu cuenta en Uptask",
        html: ` <p>Hola: ${nombre}, Comprueba tu cuenta en Uptask</p>
            <p>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace: </p>    
                <a href="${process.env.FRONTEND_URL3}/confirmar/${token}" style="width: 220px; height: 220px; padding: 10px; color: #fff; background: #0000ff; cursor: pointer;  border-radius: 10px; text-decoration: none;">Comprobar Cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    })
}
    
export const emailForgotPassword = async (datos) => {
    const { email, nombre, token } = datos
    
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    //Informacion Mail

    const info = await transport.sendMail({
        from: '"Uptask - Restablece tu Password" <cuentas@uptask.com>',
        to: email,
        subject: "Uptask - Restablece tu Password",
        text: "Restablece tu Password",
        html: ` <p>Hola: ${nombre}, has solicitado Restablecer tu Password</p>
            <p>Haz clic al siguiente enlace para Restablecer tu Password: </p>    
                <a href="${process.env.FRONTEND_URL3}/forgot-password/${token}" style="width: 220px; height: 220px; padding: 10px; color: #fff; background: #0000ff; cursor: pointer;  border-radius: 10px; text-decoration: none;">Restablecer Password</a>
            <p>Si no solicitaste Restablecer tu Password, puedes ignorar el mensaje</p>
        `
    })
}
    