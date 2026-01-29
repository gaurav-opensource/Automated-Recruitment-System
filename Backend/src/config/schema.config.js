const Joi = require("joi");

/* ===========================
   STUDENT REGISTER VALIDATION
   =========================== */
const studentRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),

  role: Joi.string()
    .valid("student")
    .required(), // ✅ ADDED

  profilePhoto: Joi.string().uri().optional(),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{9,14}$/)
    .optional(),

  // education
  college: Joi.string().optional(),
  degree: Joi.string().optional(),
  branch: Joi.string().optional(),
  graduationYear: Joi.number().integer().min(1900).max(2100).optional(),
  skills: Joi.array().items(Joi.string()).optional(),

  // projects
  projects: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      description: Joi.string().optional(),
      githubLink: Joi.string().uri().optional(),
    })
  ).optional(),

  // experience
  experience: Joi.array().items(
    Joi.object({
      company: Joi.string().required(),
      role: Joi.string().required(),
      duration: Joi.string().required(),
    })
  ).optional(),

  // certifications
  certifications: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      issuer: Joi.string().optional(),
      year: Joi.string().optional(),
    })
  ).optional(),

  about: Joi.string().optional(),

  // social links
  socialLinks: Joi.object({
    linkedin: Joi.string().uri().optional(),
    github: Joi.string().uri().optional(),
    portfolio: Joi.string().uri().optional(),
  }).optional(),

  resume: Joi.string().uri().optional(),
  location: Joi.string().optional(),
  appliedJobs: Joi.array().items(Joi.string().hex().length(24)).optional(),
  savedJobs: Joi.array().items(Joi.string().hex().length(24)).optional(),
});


/* ===========================
   HR SIGNUP VALIDATION
   =========================== */
const HrSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  contact: Joi.string().required(),
  companyName: Joi.string().required(),
  position: Joi.string().required(),

  role: Joi.string()
    .valid("hr")
    .required(), // ✅ ADDED
});


/* ===========================
   LOGIN VALIDATION
   =========================== */
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  studentRegisterSchema,
  HrSignupSchema,
  loginSchema,
};
