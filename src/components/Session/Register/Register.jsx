import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import topLogo from './../../../assets/img/Logo-tradingWaves_white.png'

import config from "../../../services/config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      show: false,
      historyPush: "",
      modalTitle: "",
      messageBody: "",
      terms: false,
      showTerms: false,
      url: "",
      sponsor: undefined,
      loading: false,
      created: false
    };
    this.assignSponsor = this.assignSponsor.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentWillMount() {
    let url = window.location.toString().split("?code=");
    this.setState(
      {
        url: url
      },
      () => this.assignSponsor()
    )
  }
  assignSponsor() {
    if (this.state.url.length > 1) {
      this.setState({
        sponsor: this.state.url[1]
      });
    }
  }
  submitForm() {
    this.setState({
      loading: true
    });
    fetch(config.defaultURL + "/v1/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        parent_uuid: this.state.sponsor
      })
    }).then(response =>
      response.json().then(data => {
        if (response.ok) {
          this.setState({
            created: true,
            loading: false
          });
        } else if (response.status === 422) {
          console.log(data);
          this.setState({
            clicked: false,
            errors: data,
            loading: false
          });
        }
      })
    );
  }

  closeSweet() {
    this.props.history.push(this.state.historyPush);
    this.setState({
      show: false
    });
  }
  terms() {
    let set;
    if (this.state.terms) {
      set = false;
    }
    if (!this.state.terms) {
      set = true;
    }
    this.setState({ terms: set });
  }
  showTerms() {
    let set;
    if (this.state.showTerms) {
      set = false;
    }
    if (!this.state.showTerms) {
      set = true;
    }
    this.setState({ showTerms: set });
  }
  render() {
    let errors = [...this.state.errors];
    let button = (
      <a className="btn btn-primary btn-block" disabled>
        Register
      </a>
    );
    let termsRead = this.state.showTerms ? (
      <div className="form-group">
        <label className="control-label">Terms and conditions</label>
        <textarea
          id="exampleFormControlTextarea1"
          rows="6"
        >
          TÉRMINOS Y CONDICIONES

Entre los suscritos a saber, de una parte: Tradingwaves.com, y quien para los efectos del presente contrato en adelante se denominarán MaterMinerClub.biz y/o El Contratante-; De otra parte, está la persona natural y/o Jurídica quien se vincula a través del presente documento y que encuentra plena identificación en su respectiva afiliación y quien para los efectos del presente Contrato se denominará Vendedor Independiente. La presente relación es estrictamente Comercial y está regida por el Marco Jurídico Mercantil y Civil de cada país, y regulada bajo las Leyes Civiles y Comerciales que versan sobre las actividades Mercantiles de sistemas de multinivel o mercadeo en todos los países. Entre MaterMinerClub.biz y el Vendedor Independiente no existe vínculo laboral alguno, ya que el presente no obliga al Vendedor Independiente a cumplir un horario de trabajo; el Vendedor Independiente, no recibe órdenes directas de MaterMinerClub.biz (en ninguno de sus países) para llevar a cabo determinadas funciones, el Vendedor Independiente no es su subordinado y tampoco recibe una remuneración fija que se pueda asemejar al pago de un salario. Para celebrar el presente Contrato las partes manifiestan que lo ejercen de modo libre, espontáneo y voluntario, siendo así cómo se estipulan las siguientes:
CLÁUSULAS:
PRIMERA. Objeto del contrato. El presente Contrato tiene como objeto el desarrollo de actividades de comercialización de productos virtuales (digitales) y/o físicos a través del sistema de comercialización directa, en red o multinivel, donde el Vendedor Independiente usará las plataformas de propiedad de la sociedad Tradingwaves.com 

SEGUNDA. Derechos del Vendedor Independiente. Son Derechos del Vendedor además de las conferidas por la Ley, las siguientes; a) Contar con una oficina virtual para el seguimiento de su red; b) A recibir el pago de las comisiones a que tenga Derecho de forma oportuna. Parágrafo. Siempre y cuando la cuenta del afiliado no se encuentre suspendida. c) A recibir todos los beneficios contemplados en el plan de compensación. 

TERCERA. Obligaciones y Prohibiciones del Vendedor Independiente. Son obligaciones del Vendedor Independiente a) Pagar el costo de la compra del servicio o producto de forma oportuna y en la forma estipulada. b) Capacitarse de forma permanente en las actualizaciones que surjan del negocio. c) Apoyar de forma permanente a aquellas personas que hacen parte de su red. Parágrafo. Se denominan personas parte de la red, todo aquellas personas que el Vendedor Independiente, vincule por su cuenta y riesgo bajo su código, como cliente directo o en red de multinivel, en el entendido en que MaterMinerClub.biz presume la Buena Fe de cada uno de sus vinculados y/o afiliados y quienes se conviertan en Vendedores Independientes. d) A no usar el nombre MaterMinerClub.biz, de forma indebida, maltratando, abusando, mancillando, calumniado y/o injuriando el buen nombre de la compañía. Parágrafo: En caso de darse esta situación, la firma MaterMinerClub.biz suspenderá de forma inmediata al afiliado y este perderá las comisiones generadas al momento de la suspensión. Para lograr la activación nuevamente, luego de ser suspendido por esta causal se hará directamente con el área jurídica de la compañía a través de legal@Tradingwaves.com, e) El Vendedor Independiente NO DEBE, usar el nombre de MaterMinerClub.biz, para comercializar ningún otro producto que no pertenezca a la compañía ni los propios en forma indebida. f) A guardar las normas mínimas de respeto, armonía, ética y profesionalismo con MaterMinerClub.biz, con sus afiliados – Vendedores independientes, con los demás afiliados y/o Vendedores Independientes que no pertenecen a su red y con todos aquellos colaboradores y/o equipo de trabajo que hagan parte de Tradingwaves.com, g) Es obligación del Vendedor Independiente, tramitar en debida forma cualquier reclamación y/o controversia que surja, a través de los canales dispuestos para ello. (Son Canales debidos de comunicación los siguientes: Mail o Correo Electrónico: contact@Tradingwaves.com). Y demás canales de comunicación o de contacto que la empresa tenga en este momento o en el futuro en nuestros medios de comunicación y divulgación de nuestro negocio. h) Debe tener capacidad moral y legal para contratar, debe ser persona mayor de edad. Todo bajo la aplicación de los principios de buenas costumbres personales y comerciales. Parágrafo: MaterMinerClub.biz, no está obligado a responder comunicaciones que sean remitidas a la compañía de forma irrespetuosa, indebida y/o con lenguaje soez. i) Es obligación del Vendedor Independiente suministrar a MaterMinerClub.biz toda la documentación e información requerida de forma oportuna y veraz al momento de la afiliación para que tanto MaterMinerClub.biz como el Vendedor Independiente puedan dar cumplimiento a sus obligaciones Comerciales, Legales, Fiscales y Tributarias. Parágrafo: MaterMinerClub.biz presumirá de Buena Fe sobre la información, capacidad, Mayoría de Edad y documentación suministrada y allegada por el Vendedor Independiente, por tal motivo no se hará responsable de las falsedades que el Vendedor Independiente llegase a suministrar. j) Es obligación del Vendedor Independiente, allegar los datos de la cuenta bancaria a su nombre y no a nombre de terceros. Deberá remitir toda la información que MaterMinerClub.biz requiera para el pago de sus bonos y/o comisiones. Parágrafo: No se Constituirá en mora la firma Comercial MaterMinerClub.biz, cuando no pueda efectuar los pagos por bonos o comisiones a las que tenga derecho el Vendedor Independiente, por causa de su omisión en la entrega de la información oportuna de su cuenta y demás datos requeridos por MaterMinerClub.biz. Entiéndase por oportuno toda aquella información y documentación aportada al momento de la afiliación o en un plazo no mayor a 5 días calendario. Son Prohibiciones del Vendedor Independiente: a). Utilizar la propiedad intelectual e industrial de MaterMinerClub.biz en cualquiera de sus formas, ya sea sobre las marcas, logos, nombres e insignias comerciales, patentes de invención y cualquier otra propiedad industrial e intelectual sin la respectiva autorización. Parágrafo: Si el Vendedor Independiente, incurriera en alguna de las prohibiciones y/o faltara en alguna de sus obligaciones, su cuenta será suspendida de forma inmediata y acarreará las sanciones correspondientes. Para tramitar lo hará con las áreas encargadas y en los casos especiales lo gestionará directamente con el área Jurídica en legal@Tradingwaves.com 

CUARTA. Cláusula de Confidencialidad. El Vendedor Independiente, debe guardar la presente Cláusula así: a) Deberá mantener en estricta confidencialidad todos aquellos documentos e información que bajo esta modalidad le hayan sido conferidos. b) No podrá utilizar la información Confidencial, para su beneficio personal ni el de terceros. c) No podrá negociar, transar, comercializar, divulgar, anunciar de forma verbal, escrita, ni en ningún tipo de redes sociales información que se la haya sido confiada como Confidencial. d) Se entenderá como información Confidencial también las que se rotulen, nombren, etiqueten o designen como Secreto Empresarial. e) Para anunciar algún tipo de información deberá solicitar previamente y por escrito autorización para cualquier publicación relacionada con el tema del contrato. f) Todo desarrollo técnico, tecnológico, invención, adaptación, versiones y mejoras (entre otros) que se hagan del producto original por cuenta del Vendedor Independiente y/o de cualquier persona sin previa autorización de MaterMinerClub.biz, serán de propiedad de Tradingwaves.com Parágrafo: El incumplimiento de la presente cláusula está regida por los Artículos 308 de la Ley 599 de 2000, Ley 256 de 1996; Decisión 486 de la CAN. El incumplimiento dará lugar de forma inmediata a demandas civiles y/o penales según el caso, en concordancia a la Legislación de cada país. 

QUINTA. Obligaciones de MaterMinerClub.biz. Son obligaciones de MaterMinerClub.biz: a) Adelantar de forma ágil y oportuna los respectivos registros de acuerdo a los marcos Jurídicos. b) Suministrar los servicios y/o productos ofrecidos a los Vendedores Independientes: aplicación para Smartphone (android); oficina virtual online; c) Mantener sus canales de comunicación dispuestos para atención a los Vendedores Independientes. d) Abrir los canales necesarios para que los Vendedores Independientes tengan la oportunidad de plantear sus quejas, peticiones y/o reclamos. e) Dar respuesta de manera clara y precisa a las quejas, peticiones y reclamos interpuestos por el Vendedor independiente y sus afiliados, en la forma y en los tiempos que manda la Ley. f) Proporcionar las herramientas adecuadas a los Vendedores Independientes para el óptimo desarrollo de su actividad de mercadeo en red. 

SEXTA. Derechos de MaterMinerClub.biz. Son Derechos de MaterMinerClub.biz a) Recibir información veraz y oportuna por parte del Vendedor Independiente. b) A qué se le remitan todas las quejas, peticiones y reclamos por los canales suministrador en el presente documento de forma respetuosa. c) A qué se le respete su propiedad Intelectual, invenciones, productos, creaciones y demás, para que no sean usadas en forma indebida o sin su autorización. d) A que se respete su BUEN NOMBRE COMERCIAL. e) A que antes de una controversia Legal se acudan a los mecanismos señalados en el presente documento. f) A que se respeten sus planes de bonos, pagos, fechas y programas de compensación establecidos en el programa de MaterMinerClub.biz por ser un diseño general y no particular para cada Vendedor Independiente Individual. Parágrafo: No podrá el Vendedor Independiente solicitar se ajuste a su necesidad en particular, ya que esto perjudica toda la red de Vendedores Independientes. Parágrafo: Las Redes son INMODIFICABLES, en caso de que el Vendedor Independiente lleve a cabo una indebida afiliación este será quien asuma su error y no la empresa. No se podrá bajo ninguna circunstancia modificar las redes. 

SEPTIMA. Tipo de plan de compensación que regirá la relación entre las partes: El Vendedor Independiente manifiesta antes de aceptar el presente contrato que conoce nuestro plan de compensacion presentado y explicado previamente por un vendedor independiente. En caso de necesitar asistencia puede solicitar el plan de compensación a contact@Tradingwaves.com Parágrafo: Dentro del plan de pagos que realice MaterMinerClub.biz al Vendedor Independiente, MaterMinerClub.biz aplicara al valor neto a cancelar los impuestos a que haya lugar, esto de conformidad y en concordancia a las políticas, normas y leyes establecidas en el país que corresponda (En el entendido que el país que corresponda, es aquel estado del cual el Vendedor Independiente tenga su cuenta bancaria y se presume que este es el mismo que corresponde a su domicilio). 

OCTAVA. Requisitos para pago. Para hacer efectivo el pago de las comisiones ganadas, el Vendedor Independiente deberá enviar en fotocopia sencilla o escáner de su documento de registro tributario que corresponda al país donde desarrolla la red (si así lo exige la Ley de dicho País), copia sencilla o en escáner de su respectivo documento de identificación y la información de la cuenta bancaria personal a la cual la empresa deberá hacer la consignación o los respectivos depósitos por concepto de pagos de los bonos descritos dentro del presente contrato, o su respectiva billetera de criptomonedas. El vendedor independiente acepta de conformidad que en el supuesto de no enviar el documento fiscal que la autoridad fiscal de su país exija para poder enviarle su pago, MaterMinerClub.biz no podrá enviar su pago Parágrafo 1. No se consigna a favor de terceros. De esta manera MaterMinerClub.biz gestionará su respectiva solicitud de comisiones. 

NOVENA. Forma y periodicidad de pago. a). -Los bonos se pagarán en Bono de Compra y/o en BTC, LTC (o la que en su momento determine Tradingwaves.com. El valor del pago corresponderá al generado por sus comisiones, no incluye impuestos y demás, los cuales serán retenidos por la empresa de acuerdo a lo establecido por las Leyes Fiscales del país de residencia del afiliado. b). -Se Depositarán en el Monedero Electrónico vinculado previamente por el Vendedor Independiente. c). -Estos pagos se verán reflejados de manera inmediata en la oficina virtual del Vendedor Independiente. Parágrafo 1: MaterMinerClub.biz no asumirá los costos generados por las respectivas entidades Bancarias de cada país, o por las empresas propietarias de las billeteras; el valor será consignado o depositado en el Monedero previamente vinculado por el Vendedor Independiente. El monto será por el valor neto generado por los bonos a que el Vendedor Independiente tenga derecho. Parágrafo 2: MaterMinerClub.biz NO asumirá pagos adicionales por cuenta de los cobros, retenciones, giros, recaudos, pagos desde otras plazas, impuestos, saldos, transferencias y otras que generen los bancos en ocasión a sus propias políticas financieras y las de cada país. d). -Es deber del Vendedor Independiente informarse sobre las condiciones y restricciones aplicables a su cuenta bancaria y/o billetera virtual. Parágrafo 3: MaterMinerClub.biz es respetuoso de las políticas bancarias y financieras de cada país y no entrará en nombre de terceros a debatir y mucho menos a hacer reclamaciones en nombre de sus Vendedores Independientes por las condiciones y políticas de manejos bancarios de sus cuentas. Por tal razón en el presente Contrato se deja claridad que ES DEBER DEL VENDEDOR INDEPENDIENTE INFORMARSE DEBIDAMENTE SOBRE LAS CONDICIONES Y RESTRICCIONES DE SU ENTIDAD BANCARIA y/o BILLETERA VIRTUAL. e). -Los pagos se realizarán de acuerdo al calendario explicado previamente por su vendedor independiente. f).-El Vendedor Independiente acepta de conformidad tener conocimiento de dichas conversiones y formas de pago de la empresa . g). -Para tener derecho a cobrar comisiones en determinado período, el Vendedor deberá estar activo a la fecha de corte del mismo. h). -El vendedor Independiente debe realizar el pago de mantenimiento de su app propia de MaterMinerClub.biz en la fecha exacta correspondiente al día en que se afilió a MaterMinerClub.biz i). -No realizar el pago en dicha fecha quedará sujeto a estas 3 consideraciones: 1). -Su membresía quedará con estatus de caducada, y por lo tanto dejará de percibir las comisiones que se generen dentro de su red por las compras de sus invitados personales e indirectos desde el momento mismo de caducidad de su membresía y hasta que realice el pago de las mismas. En este tenor, si llegado el momento de hacer el siguiente cierre quincenal el afiliado aún permanece con estatus de caducado, perderá las comisiones generadas en la quincena anterior, aún aquellas que generó antes del vencimiento de su pago mensual, toda vez que forman parte del periodo en el que el debería estar activo para poder cobrarlas. 2).-Las comisiones generadas en otros periodos previos al periodo que dejó de pagar, quedarán con status de congeladas y no las perderá, pero no podrá disponer de ellas hasta volver a activarse. Parágrafo 5: Después de 90 días exactos de inactividad se aplicará lo relacionado en la Cláusula Décimo Segunda Parágrafo 1. 3).-Quedará inactiva su app MaterMinerClub.biz, así como tampoco tendrá acceso a su panel de edición de la misma. 

DÉCIMA. Causales y Formas De Terminación. El presente contrato (y la cuenta de afiliado que ampara) se dará por terminado de las siguientes formas: a) Por acuerdo común de las partes b) De forma unilateral por el Vendedor Independiente mediante escrito dirigido a MaterMinerClub.biz c) Se terminara de forma unilateral cuando el Vendedor Independiente presente comportamientos o acciones inapropiadas, calumnias, injurias que ocasionen detrimento o daño a la humanidad de otros Vendedores Independientes y/o en contra de su buen nombre y el de MaterMinerClub.biz y por actos de competencia desleal. d). – Por falta de manifestación escrita y/o verbal de parte del afiliado al cierre del año fiscal inmediato anterior de desear permanecer en el negocio en el Nuevo Año Fiscal. Entiéndase como Año Fiscal el Periodo comprendido del 1 de enero al 31 de diciembre en cualquier año calendario. e). – Inactividad de parte del afiliado en los 3 meses anteriores al cierre del año fiscal anterior, de acuerdo a lo establecido en la Cláusula Décima Primera. f) Por orden Judicial y g). -Por Liquidación de la compañía. 

DÉCIMA PRIMERA. Suspensión de la Cuenta. Se suspenderá de forma indefinida la cuenta del Vendedor Independiente por las siguientes condiciones: a) Por suministrar de información irreal y/o falsa de forma premeditada. b) Por inactividad de más de 90 días de la cuenta adquirida con MaterMinerClub.biz, por parte del Vendedor Independiente.c) Por proceder de forma irregular y anti ética en contra de la compañía. d) Por difamación. e) Por lesión o agresión física, verbal, escrita en contra de MaterMinerClub.biz y/o su personal administrativo y afiliados, sea ejercida de forma directa y/o por cualquier medio de comunicación y/o red social en contra. Parágrafo: Y por las demás que sean permitidas por la Ley y por las descritas dentro del cuerpo del presente documento. Los afiliados cuyas cuentas haya sido terminadas definitivamente perderán todos los beneficios económicos y toda la red de afiliados que estén vinculados a dicha cuenta. En el caso de Terminación de la Cuenta de manera Definitiva, la persona no podrá solicitar una nueva cuenta en los siguientes 12 meses. 

DÉCIMA SEGUNDA. Activación de la Cuenta Suspendida. Para Activar la cuenta de MaterMinerClub.biz una vez suspendida el Vendedor Independiente deberá; a) Hacer la petición al área de servicio al Cliente en contact@marterminerclub.biz b). -Actualizar los datos con los documentos e información requerida por nuestra área de servicio al Cliente. c) En caso de ser suspendida por inactividad deberá cancelar el valor correspondiente al 30% del valor de la membresía de la fecha de la activación. Parágrafo 1: El Vendedor Independiente, perderá el derecho que tenga sobre sus comisiones por inactividad superior a 90 días. Parágrafo 2: cada año deben pagar una renovación a su afiliación / membresía, y podrá entrar en Terminación Definitiva de acuerdo a lo establecido en la Cláusula Décima inciso e y f. 

DÉCIMA TERCERA. En caso de Controversia surgida entre las partes, éstas deberán resolverse ante un Tribunal de Arbitramento en los términos en que lo ordena la Ley antes de iniciar cualquier tipo de acción Contenciosa Judicial. 

DÉCIMA CUARTA. POLÍTICA ANTI LAVADO DE DINERO. En apoyo a fortalecer las acciones en materia de Prevención y Detección de Operaciones con Recursos de Procedencia Ilícita y basados en las disposiciones legales, la empresa MaterMinerClub.biz, está capacitada para solicitar el apoyo de los clientes para la integración de su Expediente de Identificación, esto con el objeto de prevenir cualquier operación comercial sin importar el tipo de instrumento monetario utilizado siempre que exista sospecha alguna relacionada al origen de los mismos ya sea Lavado de dinero o de cualquier otra actividad penada por las autoridades en cada País. Según las características de los clientes, la empresa MaterMinerClub.biz. cuenta con la facultad de eludir cualquier operación sospechosa sin hacerse merecedora a cualquier tipo de sanción o indemnización. Esta misma política Anti Lavado de Dinero aplica para todos los países donde Tradingwaves.com, tenga operaciones comerciales, pudiendo estar radicada o no de manera local en dicho territorio. Parágrafo: Tradingwaves.com,, presume de BUENA FE, que los dineros usados por nuestros afiliados para el ejercicio de nuestra activada PROVIENEN DE ACTIVIDADES LÍCITAS. 

DÉCIMA QUINTA. POLÍTICA DE PRIVACIDAD. En estricto cumplimiento a los establecido por las Leyes Internacionales y de los países donde tenemos operaciones comerciales, mismas que hacen referencia al respeto por los derechos fundamentales del buen nombre y de la protección de la intimidad, hacemos de su conocimiento lo importante que es para Tradingwaves.com resguardar la privacidad de sus datos personales, es por ello que publicamos nuestra Política de privacidad: MaterMinerClub.biz Group S.A.S requiere, para su correcta operación comercial, la recopilación de ciertos datos personales, los cuales son protegidos adecuadamente y en cumplimiento de la Ley. MaterMinerClub.biz recabará aquéllos “Datos Personales” que sean necesarios para la adecuada prestación de sus servicios. Dichos Datos Personales incluyen, más no están limitados a los siguientes: 

-Datos de identificación Personales: Nombre completo – Domicilio Principal – País – Teléfono Móvil -Operador Móvil -Correo electrónico – Fecha de Nacimiento -Etcétera. 

-Uso de la Información: Los Datos Personales que nos ha proporcionado serán utilizados para los siguientes fines: a) Actividades relacionadas con la venta y promoción de los productos que comercializamos a través de nuestros diferentes canales de venta, incluyendo de manera enunciativa más no limitativa, el procesamiento de solicitudes, actividades promocionales y/o de mercadotecnia, quejas o reclamaciones, entre otros. b) Creación e implementación de procesos analíticos y estadísticos necesarios para la prestación de nuestros servicios; c) Contactarlo para cualquier tema relacionado a los Servicios o al presente Aviso de Privacidad. 

-Transferencia de datos a terceros: Como parte de sus actividades de prestación de servicios, Tradingwaves.com puede requerir la transferencia de sus Datos Personales a: Aquellos terceros no afiliados prestadores de servicios auxiliares o complementarios de los Servicios, incluyendo, comisionistas bancarios, empresas de procesamiento de datos e impresion de Tarjetas, empresas de envío de material de marketing (impreso o electrónico), empresas de mensajería, agencias de publicidad, proveedores de servicios turísticos (como aerolíneas, hoteles o arrendadoras de autos), empresas de custodia y guarda de información (física o en medios electrónicos) con el propósito de que estos asistan en la prestación de Servicios; y Agencias externas para efecto de representación legal. 

-Manejo de la Información: Es nuestra obligación proporcionarle los mecanismos adecuados con la finalidad de que usted pueda revisar su información personal y solicitar alguna de las siguientes acciones: I) Acceso.– Usted podrá solicitar en todo momento conocer qué datos suyos han sido recabados y son conservados por Tradingwaves.com II) Rectificación.- En caso de que alguno de sus datos sea inexacto o incompleto podrá solicitar su corrección, debiendo adjuntar la documentación que acredite dicha modificación. III) Cancelación.- Podrá solicitarse en todo momento la cancelación de los datos; en caso de ser procedente la solicitud, los datos no podrán ser tratados de ninguna manera para su posterior supresión. IV) Oposición.- En todo momento el titular podrá negarse por causa justificada al tratamiento de sus datos personales. 

5.-Cambios a la Política de Privacidad: MaterMinerClub.biz, se reserva el derecho de realizar cualquier modificación a ésta política de privacidad, la cual se hará de su conocimiento a través de los canales de divulgación de nuestra compañía. 

DÉCIMA SEXTA. PREMIOS E INCENTIVOS: El Vendedor Independiente tiene derecho a recibir los premios e incentivos que la empresa ofrezca en determinados momentos y de acuerdo a las políticas que la empresa determine para dichos premios. Sin embargo, independientemente de las condiciones particulares de cada Premio e Incentivo tengan para cada Promoción, los Vendedores Independientes deberán cumplir al 100% con las siguientes condiciones y restricciones: 1).-Estar activo en la empresa, de acuerdo a lo que establecen las cláusulas DECIMA y DECIMA PRIMERA. 2).-Haber tenido actividad de al menos 30 días en la empresa antes de la fecha del PREMIO alcanzado. 3).-Mantenerse activo en la empresa en los siguientes 6 meses después de obtener el premio. 4).-En el caso de que el premio sea un Viaje pagado por la empresa, la obligación del Vendedor Independiente premiado es de mantenerse activo durante todo el periodo que cubra desde la obtención del premio hasta la utilización del mismo. 5).-El caso de Premios de Viajes a países donde solicitan VISADO, el trámite de la misma es responsabilidad del Vendedor Independiente beneficiado con el premio. La empresa no es responsable de dicho trámite. El vendedor independiente deberá cubrir los gastos correspondientes de dichos trámites. 6).-Para la reclamación de los premios de Viaje Pagado por la empresa a países donde exigen VISADO, el Vendedor Independiente deberá enviar, junto con su solicitud de la reclamación de su premio, fotocopia de su pasaporte donde se aprecie el VISADO VIGENTE expedido por Autoridad Competente a nombre del Vendedor Independiente ganador, para ingresar al país de destino del premio. 7).-En el caso de Premio de Viaje pagado por la empresa, el Vendedor Independiente acepta sujetarse a los términos y condiciones que imponga o tenga vigente la compañía responsable de la entrega del premio al Vendedor Independiente. Estos términos y condiciones son independientes a los términos y condiciones de la empresa. La empresa no tiene injerencia en dichos términos, ya que son los términos de una empresa tercera. 

DÉCIMA SÉPTIMA. Aceptación. El Vendedor Independiente declara que ha leído y comprendido el contenido del presente contrato, del plan de compensación, y de las políticas y procedimientos de MaterMinerClub.biz y manifiesta estar de acuerdo con su contenido. 
        </textarea>
      </div>
    ) : (
      <div />
    );
    if (this.state.terms) {
      button = (
        <a
          className="btn btn-primary btn-block"
          onClick={() => this.submitForm()}
        >
          Registrarme
        </a>
      );
    }
    if (this.state.loading) {
      button = (
        <a className="btn btn-primary btn-block" disabled>
          Registrarme <i className="fa fa-spinner fa-spin" />
        </a>
      );
    }
    if (errors.length > 0) {
      errors = errors.map((error, index) => {
        return (
          <div>
            <code key={index}>{error}</code>
            <br />
          </div>
        )
      })
    }
    let refererInput = (
      <div className="form-group">
          <input
            key={this.state.sponsor ? "notLoadedYet" : "Loaded"}
            value={this.state.sponsor}
            type="text"
            name="sponsor"
            placeholder="Sponsor (optional)"
            onChange={value => this.handleChange(value)}
          />
      </div>
    );
    let panelContent = !this.state.created ? (
      <form id="loginForm" noValidate>
        <div className="form-group">{errors}</div>
        <div className="form-group text-center text-white">
          <p>Register now and start earning benefits.</p>
        </div>
        <div className="form-group">
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              onChange={value => this.handleChange(value)}
            />
        </div>
        <div className="form-group">
            <input
              id="pass"
              type="password"
              name="password"
              placeholder="Password"
              onChange={value => this.handleChange(value)}
            />
        </div>
        <div className="form-group">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={value => this.handleChange(value)}
          />
        </div>
        {refererInput}
        {termsRead}
        <div className="form-group text-white">
          <div className="checkbox checkbox-btk">
            <input
              id="checkbox3"
              type="checkbox"
              onChange={() => this.terms()}
            />
            <label htmlFor="checkbox3">
              I agree with {" "}
              <a onClick={() => this.showTerms()}>terms and conditions</a>
            </label>
          </div>
        </div>
        <div>{button}</div>
      </form>
    ) : (
      <div className="text-center">
        <h2>
          Registro completo, revisa tu email y sigue el link de verificación.
        </h2>
      </div>
    );
    const Header = styled.div`
      width: 250px;
      margin-left: auto;
      margin-right: auto;
    `;

    return (
      <div className="register-wrapper custom-back">
        <div className="container-center lg text-white">
          <div className="panel custom-panel">
            <div className="panel-heading">
              <Header>
                <img src={topLogo} width="100%" />
              </Header>
            </div>
            <div className="panel-body">{panelContent}</div>
          </div>
          <div className="text-center ">
            You have an account?  <Link to="/login" className="text-white">Log in</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
