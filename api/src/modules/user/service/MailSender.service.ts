import configServer from "../../../config/configServer";
import { transporter } from "../../../config/mailer";

import { userModelInterface } from "../interface/userModel.interface";

export default class MailSenderService {
  async run(data: userModelInterface) {
    await transporter.sendMail({
      from: `EasyBank - <${configServer.mailer.user}>`,
      to: data.mail,
      subject: "Bienvenido a EasyBank",
      html: `<section style='display:block; width:600px'><img style="width:600px" src='https://i.postimg.cc/3wfwcHSW/bannermail.png'/></section>
      <section style='display:block; width:100%'>
      <p>Te enviamos tu código de referencia para que puedas crearte tu cuenta de homebanking.</p>
      <p>¡Es muy importante que no pierdas este código!</p>
      <p>Código: <b>${data.reference_code}</b></p>
      
      </section>
      `,
    });
  }
}
