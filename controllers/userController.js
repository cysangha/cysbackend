const Users = require("../models/users");
const UsersApp = require("../models/usersApp");
let Otp = require("../models/otp");
let Admin = require("../models/admin");
let NewMember = require("../models/member");
let Payments = require("../models/payments");
let PaymentsAdmin = require("../models/paymentsAdmin");

const delUser = async (req, res) => {
  let id = req.body.id;
  // res.json({ message: 'ok' })
  // console.log(id)
  try {
    let response = await Users.deleteOne({ id: id });
    if (response.acknowledged) {
      res.status(200).json({ message: "ok", data: response });
    } else {
      res.status(301).json({ message: "error", data: "Something Went Wrong" });
    }
  } catch (e) {
    res.status(301).json({ message: "error", data: "Something Went Wrong" });
    console.log(e);
  }
};
const delUserApp = async (req, res) => {
  let { id, email, name, removeBy } = req.body;
  try {
    let response = await UsersApp.deleteOne({ id: id });
    if (response.acknowledged) {
      res.status(200).json({ message: "ok", data: response });
      delUserAppMailer(email, name, removeBy);
      let admins = await Admin.find();
      admins.map((el) =>
        delUserAdminMailer(el.email, el.name, name, email, removeBy)
      );
    } else {
      res.status(301).json({ message: "error", data: "Something Went Wrong" });
    }
  } catch (e) {
    res.status(301).json({ message: "error", data: "Something Went Wrong" });
    console.log(e);
  }
};

const newMemberAdd = async (req, res) => {
  let {
    id,
    email,
    member_name,
    father_name,
    access,
    member_id,
    type,
    date,
    membershipPurchaseDate,
    membershipPeriod,
    membershipPeriodBeng,
    pricePaid,
    mobile,
  } = req.body;
  let data = await new NewMember({
    id,
    email,
    member_name,
    father_name,
    access,
    member_id,
    type,
    date,
    membershipPurchaseDate,
    membershipPeriod,
    membershipPeriodBeng,
    pricePaid,
    mobile,
  });
  try {
    let response = await data.save();
    res.status(200).json({ message: "ok" });
    newMemberAddMailer(email, member_name, member_id, mobile);
    let admins = await Admin.find();
    admins.map((el) =>
      newMemberAddAdminMailer(
        el.email,
        el.name,
        member_name,
        email,
        member_id,
        mobile
      )
    );
  } catch (e) {
    res.status(301).json({ message: "error", data: "Member Already Exists." });
  }
};
const newAdminAdd = async (req, res) => {
  let { name, email, addedBy } = req.body;
  let data = await new Admin({
    name,
    email,
    addedBy,
  });
  try {
    let response = await data.save();
    res.status(200).json({ message: "ok" });
    newAdminMailer(email, name, addedBy);
    let admins = await Admin.find();
    admins.map((el) =>
      newAdminAdminMailer(el.email, el.name, name, email, addedBy)
    );
  } catch (e) {
    res.status(301).json({ message: "error", data: "Member Already Exists." });
  }
};
const newMemberToAdminAdd = async (req, res) => {
  let { name, email, addedBy, purpose } = req.body;
  let data = await new Admin({
    name,
    email,
    addedBy,
    purpose,
  });
  try {
    let response = await data.save();
    res.status(200).json({ message: "ok" });
    newAdminMailer(email, name, addedBy);
    let admins = await Admin.find();
    admins.map((el) =>
      newMemberToAdminAmdinMailer(
        el.email,
        el.name,
        name,
        email,
        addedBy,
        purpose
      )
    );
  } catch (e) {
    res.status(301).json({ message: "error", data: "Member Already Exists." });
  }
};
const newAdminToMemberAdd = async (req, res) => {
  let { name, email, addedBy, purpose } = req.body;
  let data = await new Admin({
    name,
    email,
    addedBy,
    purpose,
  });
  let response = await Admin.deleteOne({ email: email });
  try {
    if (response.acknowledged) {
      res.status(200).json({ message: "ok", data: response });
      AdminRemoveMailer(email, name, removeBy);
      let admins = await Admin.find();
      admins.map((el) =>
        newAdminToMemberAdminMailer(el.email, el.name, name, email, removeBy)
      );
    } else {
      res.status(301).json({ message: "error", data: "Something Went Wrong" });
    }
  } catch (e) {
    res.status(301).json({ message: "error", data: "Member Already Exists." });
  }
};
const AdminRemove = async (req, res) => {
  let { name, email, removeBy } = req.body;
  let response = await Admin.deleteOne({ email: email });
  try {
    if (response.acknowledged) {
      res.status(200).json({ message: "ok", data: response });
      AdminRemoveMailer(email, name, removeBy);
      let admins = await Admin.find();
      admins.map((el) =>
        AdminRemoveAdminMailer(el.email, el.name, name, email, removeBy)
      );
    } else {
      res.status(301).json({ message: "error", data: "Something Went Wrong" });
    }
  } catch (e) {
    res.status(301).json({ message: "error", data: "Member Already Exists." });
  }
};
const newMemberAddByAdmin = async (req, res) => {
  let {
    member_name,
    father_name,
    member_id,
    mobile,
    birthdate,
    email,
    amountPaid,
    addedBy,
  } = req.body;

  try {
    res.status(200).json({ message: "ok" });
    newMemberAddByAdminMailer(
      email,
      member_name,
      father_name,
      member_id,
      mobile,
      amountPaid,
      addedBy
    );
    let admins = await Admin.find();
    admins.map((el) =>
      newMemberAddByAdminAdminMailer(
        el.email,
        el.name,
        member_name,
        father_name,
        email,
        member_id,
        mobile,
        amountPaid,
        addedBy
      )
    );
  } catch (e) {
    res.status(301).json({ message: "error", data: "Member Already Exists." });
  }
};
const newPayment = async (req, res) => {
  let {
    id,
    paymentID,
    purchasedByID,
    purchasedByName,
    purchasedByMobile,
    purchasedByEmail,
    type,
    date,
    membershipPeriod,
    membershipPeriodBeng,
    pricePaid,
  } = req.body;
  let data = await new Payments({
    id,
    paymentID,
    purchasedByID,
    purchasedByName,
    purchasedByMobile,
    purchasedByEmail,
    type,
    date,
    membershipPeriod,
    membershipPeriodBeng,
    pricePaid,
  });
  try {
    let response = await data.save();
    res.status(200).json({ message: "ok" });
    newPaymentMailer(
      purchasedByEmail,
      member_name,
      purchasedByID,
      purchasedByMobile,
      id
    );
    let admins = await Admin.find();
    admins.map((el) =>
      newPaymentAdminMailer(
        el.email,
        el.name,
        member_name,
        pricePaid,
        id,
        membershipPeriod,
        purchasedByMobile
      )
    );
  } catch (e) {
    res.status(301).json({ message: "error", data: "Payment Cannot Be Done." });
  }
};
const newOnlinePaymentByAdmin = async (req, res) => {
  let {
    id,
    paymentID,
    purchasedByID,
    purchasedByName,
    purchasedByAdminName,
    purchasedByMobile,
    purchasedByEmail,
    type,
    date,
    membershipPeriod,
    membershipPeriodBeng,
    pricePaid,
  } = req.body;
  let data = await new PaymentsAdmin({
    id,
    paymentID,
    purchasedByID,
    purchasedByName,
    purchasedByAdminName,
    purchasedByMobile,
    purchasedByEmail,
    type,
    date,
    membershipPeriod,
    membershipPeriodBeng,
    pricePaid,
  });
  try {
    let response = await data.save();
    res.status(200).json({ message: "ok" });

    let admins = await Admin.find();
    admins.map((el) =>
      newOnlinePaymentByAdminMailer(
        el.email,
        el.name,
        purchasedByName,
        purchasedByAdminName,
        pricePaid,
        id,
        membershipPeriod,
        purchasedByMobile
      )
    );
  } catch (e) {
    res.status(301).json({ message: "error", data: "Payment Cannot Be Done." });
  }
};
const newOfflinePaymentByAdmin = async (req, res) => {
  let {
    id,
    paymentID,
    purchasedByID,
    purchasedByName,
    purchasedByAdminName,
    purchasedByMobile,
    purchasedByEmail,
    type,
    date,
    membershipPeriod,
    membershipPeriodBeng,
    pricePaid,
  } = req.body;
  let data = await new PaymentsAdmin({
    id,
    paymentID,
    purchasedByID,
    purchasedByName,
    purchasedByAdminName,
    purchasedByMobile,
    purchasedByEmail,
    type,
    date,
    membershipPeriod,
    membershipPeriodBeng,
    pricePaid,
  });
  try {
    let response = await data.save();
    res.status(200).json({ message: "ok" });

    let admins = await Admin.find();
    admins.map((el) =>
      newOfflinePaymentByAdminMailer(
        el.email,
        el.name,
        purchasedByName,
        purchasedByAdminName,
        pricePaid,
        id,
        membershipPeriod,
        purchasedByMobile
      )
    );
  } catch (e) {
    res.status(301).json({ message: "error", data: "Payment Cannot Be Done." });
  }
};
const removeMemberByAdmin = async (req, res) => {
  let {
    access,
    member_name,
    father_name,
    member_id,
    mobile,
    birthdate,
    removeMemberReason,
    removedBy,
  } = req.body;

  try {
    res.status(200).json({ message: "ok" });

    let admins = await Admin.find();
    admins.map((el) =>
      removeMemberByAdminMailer(
        el.email,
        el.name,
        access,
        member_name,
        father_name,
        member_id,
        mobile,
        birthdate,
        removeMemberReason,
        removedBy
      )
    );
  } catch (e) {
    res.status(301).json({ message: "error", data: "Member Mail not Sent." });
  }
};

const userAdd = async (req, res) => {
  let {
    username,
    email,
    membersID,
    id,
    name,
    mobile,
    photoName,
    url,
    password,
    access,
    memberID,
    date,
  } = req.body;
  let data = await new Users({
    username,
    email,
    membersID,
    id,
    name,
    mobile,
    photoName,
    url,
    password,
    access,
    memberID,
    date,
  });
  try {
    let response = await data.save();
    res.status(200).json({ message: "ok" });
  } catch (e) {
    res.status(301).json({ message: "error", data: "User Already Exists." });
  }
};
const userAddApp = async (req, res) => {
  let {
    username,
    email,
    membersID,
    id,
    name,
    mobile,
    photoName,
    url,
    password,
    access,
    memberID,
    date,
  } = req.body;
  let data = await new UsersApp({
    username,
    email,
    membersID,
    id,
    name,
    mobile,
    photoName,
    url,
    password,
    access,
    memberID,
    date,
  });
  try {
    let response = await data.save();
    res.status(200).json({ message: "ok" });
    addAccountMailer(email, name, mobile, username);
    let admins = await Admin.find();
    admins.map((el) =>
      addAccountAdminMailer(el.email, el.name, email, name, mobile, username)
    );
  } catch (e) {
    res.status(301).json({ message: "error", data: "User Already Exists." });
    console.log(e);
  }
};

const emailSend = async (req, res) => {
  let rEmail = req.body.email;
  let data = await Users.findOne({ email: rEmail });
  const responseType = {};
  let otpcode = Math.floor(Math.random() * 10000 + 1);
  if (data) {
    let otpdata = new Otp({
      email: req.body.email,
      code: otpcode,
      expiresIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpdata.save();
    responseType.statusText = "Success";
    // responseType.otp = otpcode
    responseType.message = "OTP Sent, Please check your Email";
    mailer(rEmail, otpcode);
  } else {
    responseType.statusText = "Error";
    responseType.message = "Email does not Exist";
  }
  res.status(200).json(responseType);
  // console.log(otpcode)
};
const emailSendApp = async (req, res) => {
  let rEmail = req.body.email;
  let data = await UsersApp.findOne({ email: rEmail });
  const responseType = {};
  let otpcode = Math.floor(Math.random() * 10000 + 1);
  if (data) {
    let otpdata = new Otp({
      email: req.body.email,
      code: otpcode,
      expiresIn: new Date().getTime() + 300 * 1000,
    });
    let otpResponse = await otpdata.save();
    responseType.statusText = "Success";
    // responseType.otp = otpcode
    responseType.message = "OTP Sent, Please check your Email";
    mailer(rEmail, otpcode);
  } else {
    responseType.statusText = "Error";
    responseType.message = "Email does not Exist";
  }
  res.status(200).json(responseType);
  // console.log(otpcode)
};

const forgotPassword = async (req, res) => {
  let data = await Otp.findOne({
    email: req.body.email,
    code: req.body.otpCode,
  });
  // console.log(req.body.email)
  // console.log(req.body.otpCode)
  const responseType = {};
  if (data) {
    let currentTime = new Date().getTime();
    let difference = data.expiresIn - currentTime;
    if (difference < 0) {
      responseType.message = "Token Expired";
      responseType.statusText = "error";
    } else {
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
        user.password = req.body.password;
        user.save();
        responseType.message = "Password Changed Successfully";
        responseType.statusText = "Success";
        updmailer(req.body.email);
      } else {
        let newUser = await Users.findOne({ email: req.body.email });
        newUser.password = req.body.password;
        newUser.save();
        responseType.message = "Password Changed Successfully";
        responseType.statusText = "Success";
        updmailer(req.body.email);
      }
    }
  } else {
    responseType.message = "Invalid OTP";
    responseType.statusText = "error";
  }
  res.status(200).json(responseType);
  // console.log(responseType)
};
const forgotPasswordApp = async (req, res) => {
  let data = await Otp.findOne({
    email: req.body.email,
    code: req.body.otpCode,
  });
  // console.log(req.body.email)
  // console.log(req.body.otpCode)
  const responseType = {};
  if (data) {
    let currentTime = new Date().getTime();
    let difference = data.expiresIn - currentTime;
    if (difference < 0) {
      responseType.message = "Token Expired";
      responseType.statusText = "error";
    } else {
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
        user.password = req.body.password;
        user.save();
        responseType.message = "Password Changed Successfully";
        responseType.statusText = "Success";
        updmailer(req.body.email);
      } else {
        let newUser = await UsersApp.findOne({ email: req.body.email });
        newUser.password = req.body.password;
        newUser.save();
        responseType.message = "Password Changed Successfully";
        responseType.statusText = "Success";
        updmailer(req.body.email);
      }
    }
  } else {
    responseType.message = "Invalid OTP";
    responseType.statusText = "error";
  }
  res.status(200).json(responseType);
  // console.log(responseType)
};
const updatePassword = async (req, res) => {
  let data = await Teachers.findOne({
    empid: req.body.empid,
  });
  // console.log(req.body.email)
  const responseType = {};
  if (data) {
    let user = await Users.findOne({
      empid: req.body.empid,
      email: req.body.email,
    });
    user.password = req.body.password;
    user.save();
    responseType.message = "Password Changed Successfully";
    responseType.statusText = "Success";
    updmailer(req.body.email);
  } else {
    responseType.message = "Invalid OTP";
    responseType.statusText = "error";
  }
  res.status(200).json(responseType);
  // console.log(responseType)
};

const mail = process.env.GMAIL;
const mailpassword = process.env.GMAILPASSWORD;
const mailNo = Math.floor(Math.random() * 1000 + 1);

const delUserAppMailer = (email, name, removeBy) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: email,
    subject: `Your Account is Removed: Mail no ${mailNo}`,
    text: `Dear ${name}, ${removeBy} Has Removed Account from CYS App.`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};

const delUserAdminMailer = (adminEmail, addminName, name, email, removeBy) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: adminEmail,
    subject: `${name} Registration is Removed from CYS App: Mail no ${mailNo}`,
    text: `Dear ${addminName}, ${name} Registration is Removed from CYS App by ${removeBy},\n His Email id is ${email}.\n`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};

const mailer = (email, otp) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: email,
    subject: `Reset your Password: Mail no ${mailNo}`,
    text: `Your OTP is ${otp}`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};

const updmailer = (email) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: email,
    subject: `Password Changed Confirmation: Mail no ${mailNo}`,
    text: `Your Password Has Been Changed Successfully. If You Haven't Changed it Own, Please contact us at ${mail} `,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const addAccountMailer = (email, name, mobile, username) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: email,
    subject: `Registration Successful: Mail no ${mailNo}`,
    text: `Dear ${name} You Have Been Successfully Registered.\n Your username is ${username},\n Mobile No. is ${mobile},\n Email id is ${email}.\n If You Haven't Registered it Own,\n Please contact us at ${mail} `,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const AdminRemoveMailer = (email, name, removeBy) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: email,
    subject: `Your Admin Access is Removed: Mail no ${mailNo}`,
    text: `Dear ${name}, ${removeBy} Has Removed You from Admin of CYS App. Please Logout of App and Re Login.`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const AdminRemoveAdminMailer = (
  adminEmail,
  addminName,
  name,
  email,
  removeBy
) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: adminEmail,
    subject: `${name} is Removed From Admin of CYS App: Mail no ${mailNo}`,
    text: `Dear ${addminName}, One Admin ${name} Has Been Removed from Admin of CYS app by ${removeBy},\n His Email id is ${email}.\n`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const newAdminMailer = (email, name, addedBy) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: email,
    subject: `You Are Now An Admin: Mail no ${mailNo}`,
    text: `Dear ${name}, ${addedBy} Has Choosen You As an Admin of CYS App. Please Logout of App and Re Login.`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const newAdminAdminMailer = (adminEmail, addminName, name, email, addedBy) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: adminEmail,
    subject: `${name} is Now An Admin of CYS App: Mail no ${mailNo}`,
    text: `Dear ${addminName}, One Member ${name} Has Been Choosen As an Admin of CYS app by ${addedBy},\n His Email id is ${email}.\n`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const newMemberToAdminAmdinMailer = (
  adminEmail,
  addminName,
  name,
  email,
  addedBy,
  purpose
) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: adminEmail,
    subject: `${name} is Now An Admin of CYS App: Mail no ${mailNo}`,
    text: `Dear ${addminName}, One Member ${name} Has Been Choosen As an Admin of CYS app by ${addedBy} from Member To Admin from The Member Section,\n Reason is\n ${purpose} His Email id is ${email}.\n`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const newAdminToMemberAdminMailer = (
  adminEmail,
  addminName,
  name,
  email,
  addedBy,
  purpose
) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: adminEmail,
    subject: `${name} is Removed from Admin of CYS App: Mail no ${mailNo}`,
    text: `Dear ${addminName}, One Member ${name} Has Been Removed from Admin of CYS app by ${addedBy} from Admin To Member from The Member Section,\n Reason is\n ${purpose} His Email id is ${email}.\n`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const newMemberAddMailer = (email, name, member_id, mobile) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: email,
    subject: `Member Registration Successful: Mail no ${mailNo}`,
    text: `Dear ${name} Your Membership Has Been Successfully Registered.\n Your Member ID is ${member_id},\n Mobile No. is ${mobile},\n Email id is ${email}.\n If You Haven't Registered it Own,\n Please contact us at ${mail}.\n You Have Made a Successful Payment of Rs. 130. `,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const newMemberAddAdminMailer = (
  adminEmail,
  addminName,
  member_name,
  email,
  member_id,
  mobile
) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: adminEmail,
    subject: `One Member Registered Via App: Mail no ${mailNo}`,
    text: `Dear ${addminName}, One Member ${member_name} Has Been Registered Successfully via App.\n His/Her Member ID is ${member_id},\n Mobile No. is ${mobile},\n Email id is ${email}.\n`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const newMemberAddByAdminMailer = (
  email,
  name,
  father_name,
  member_id,
  mobile,
  amountPaid,
  addedBy
) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: email,
    subject: `Member Registration By Admin Successful: Mail no ${mailNo}`,
    text: `Dear ${name}, Son/Daughter of ${father_name} Your Membership Has Been Successfully Registered.\n Your Member ID is ${member_id},\n Mobile No. is ${mobile},\n Email id is ${email}.\n You Have Made a Successful Payment of Rs. ${amountPaid} to ${addedBy}. `,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const newMemberAddByAdminAdminMailer = (
  adminEmail,
  addminName,
  member_name,
  father_name,
  email,
  member_id,
  mobile,
  amountPaid,
  addedBy
) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: adminEmail,
    subject: `One Member Registered By ${addedBy} Via App: Mail no ${mailNo}`,
    text: `Dear ${addminName}, One Member ${member_name}, Son/ Daughter of ${father_name} Has Been Registered Successfully By ${addedBy} via App.\n His/Her Member ID is ${member_id},\n Mobile No. is ${mobile},\n Email id is ${email}.\n He/She Paid Rs. ${amountPaid} to ${addedBy}`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const newPaymentMailer = (email, name, pricePaid, membershipPeriod, id) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: email,
    subject: `Your Payment of Rs. ${pricePaid} is Successful: Mail no ${mailNo}`,
    text: `Dear ${name} Your Payment of Rs. ${pricePaid} is Successful.\n Your Membership will be Renewed For ${membershipPeriod} Months.\n Your Payment ID is ${id}.\n A Lots of Thanks from Chitrasenpur Yubak Sangha.\n If You Have any complain,\n Please contact us at ${mail}.\n `,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const newPaymentAdminMailer = (
  adminEmail,
  addminName,
  name,
  pricePaid,
  id,
  membershipPeriod,
  mobile
) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: adminEmail,
    subject: `${name} Made a Payment of Rs. ${pricePaid}: Mail no ${mailNo}`,
    text: `Dear ${addminName}, ${name} Made a Payment of Rs. ${pricePaid} via App.\n His/Her Payment ID is ${id},\n Mobile No. is ${mobile},\n Email id is ${email}.\n He/She Purchased Membership of ${
      membershipPeriod > 1
        ? `${membershipPeriod} Months`
        : `${membershipPeriod} Month`
    }. `,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const newOnlinePaymentByAdminMailer = (
  adminEmail,
  addminName,
  name,
  purchasedByAdminName,
  pricePaid,
  id,
  membershipPeriod,
  mobile
) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: adminEmail,
    subject: `Admin ${addminName} Made an Online Payment of Rs. ${pricePaid}: Mail no ${mailNo}`,
    text: `Dear ${addminName}, Admin ${purchasedByAdminName} Made a Payment of Rs. ${pricePaid} via App for ${name}.\n His/Her Payment ID is ${id},\n Mobile No. is ${mobile}.\n He/She Purchased Membership of ${
      membershipPeriod > 1
        ? `${membershipPeriod} Months`
        : `${membershipPeriod} Month`
    }. `,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const newOfflinePaymentByAdminMailer = (
  adminEmail,
  addminName,
  name,
  purchasedByAdminName,
  pricePaid,
  id,
  membershipPeriod,
  mobile
) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: adminEmail,
    subject: `Admin ${addminName} Made an Offline Payment of Rs. ${pricePaid}: Mail no ${mailNo}`,
    text: `Dear ${addminName}, Admin ${purchasedByAdminName} Made an Offline Payment of Rs. ${pricePaid} via App for ${name}.\n His/Her Payment ID is ${id},\n Mobile No. is ${mobile}.\n He/She Purchased Membership of ${
      membershipPeriod > 1
        ? `${membershipPeriod} Months`
        : `${membershipPeriod} Month`
    }. `,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const addAccountAdminMailer = (
  adminEmail,
  addminName,
  email,
  name,
  mobile,
  username
) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: adminEmail,
    subject: `One Member Registered Via App: Mail no ${mailNo}`,
    text: `Dear ${addminName}, One Member ${name} Has Been Registered Successfully via App.\n His/Her username is ${username},\n Mobile No. is ${mobile},\n Email id is ${email}.\n`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};
const removeMemberByAdminMailer = (
  adminEmail,
  addminName,
  access,
  member_name,
  father_name,
  member_id,
  mobile,
  birthdate,
  removeMemberReason,
  removedBy
) => {
  const nodemailer = require("nodemailer");
  var smtpTransport = require("nodemailer-smtp-transport");
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );
  let mailoptions = {
    from: mail,
    to: adminEmail,
    subject: `One Member ${member_name} Removed By Admin ${removedBy}: ${mailNo}`,
    text: `Dear ${addminName}, One Member ${member_name}, Son/ Daughter of ${father_name}, Member Id ${member_id}, Mobile No. is ${mobile}, Birth Date ${birthdate}, Access ${access} Has Been Removed By Admin ${removedBy}.\n  Reason is \n${removeMemberReason}`,
  };
  transporter.sendMail(mailoptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
};

module.exports = {
  userAdd,
  userAddApp,
  emailSend,
  forgotPassword,
  updatePassword,
  delUser,
  delUserApp,
  emailSendApp,
  forgotPasswordApp,
  newPayment,
  newMemberAdd,
  newOnlinePaymentByAdmin,
  newOfflinePaymentByAdmin,
  removeMemberByAdmin,
  newMemberAddByAdmin,
  newAdminAdd,
  AdminRemove,
  newMemberToAdminAdd,
  newAdminToMemberAdd,
};
