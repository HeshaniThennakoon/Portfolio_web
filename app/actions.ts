"use server";

import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createSession } from "@/lib/auth";
import {
  getSettings,
  saveSettings,
  getHero,
  saveHero,
  getAbout,
  saveAbout,
  getSkills,
  saveSkills,
  getExperience,
  saveExperience,
  getProjects,
  saveProjects,
  getEducation,
  saveEducation,
  getAchievements,
  saveAchievements,
  getServices,
  saveServices,
  addContact,
  getContacts,
  saveContacts,
  deleteContact,
  markContactReplied,
  Settings,
  HeroInfo,
  AboutInfo,
  SkillCategory,
  Experience,
  Project,
  Education,
  Achievements,
  Service,
} from "@/lib/data";

// 1. Submit contact form and send email
export async function submitContactForm(form: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    // Save to local JSON database
    const savedContact = await addContact(form);

    // Read SMTP Settings
    const settings = await getSettings();
    const { smtpHost, smtpPort, smtpUser, smtpPass, toEmail } = settings.emailConfig;

    let emailSent = false;
    let emailFeedback = "";

    if (smtpHost && smtpUser && smtpPass && toEmail) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort),
          secure: Number(smtpPort) === 465, // true for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        } as any);

        const mailOptions = {
          from: `"${form.name}" <${smtpUser}>`, // Send on behalf of configured email
          replyTo: form.email,
          to: toEmail,
          subject: `Portfolio Contact: ${form.subject}`,
          text: `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`,
          html: `
            <h3>Your Portfolio Contact Form Submission</h3>
            <p><strong>Name:</strong> ${form.name}</p>
            <p><strong>Email:</strong> ${form.email}</p>
            <p><strong>Subject:</strong> ${form.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-line; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${form.message}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (err: any) {
        console.error("Nodemailer Error Details:", err);
        emailFeedback = `(Email delivery failed: ${err.message || err})`;
      }
    }

    revalidatePath("/");
    revalidatePath("/admin");

    if (emailSent) {
      return { success: true, message: "Your message has been sent successfully and received via email!" };
    } else {
      return {
        success: true,
        message: `Your message was saved to the admin panel. ${emailFeedback ? emailFeedback : "SMTP not configured for sending emails."}`,
      };
    }
  } catch (error: any) {
    console.error("Contact Form Action Error:", error);
    return { success: false, message: error.message || "Something went wrong." };
  }
}

// 2. Admin Settings & Credentials Update
export async function updateAdminSettings(
  formData: {
    username: string;
    currentPass?: string;
    newPass?: string;
    theme: Settings["theme"];
    emailConfig: Settings["emailConfig"];
  }
) {
  try {
    const settings = await getSettings();

    // Verify current password if changing credentials
    if (formData.newPass && formData.currentPass) {
      const match = bcrypt.compareSync(formData.currentPass, settings.admin.passwordHash);
      if (!match) {
        return { success: false, message: "Incorrect current password." };
      }
      const salt = bcrypt.genSaltSync(10);
      settings.admin.passwordHash = bcrypt.hashSync(formData.newPass, salt);
    }

    settings.admin.username = formData.username;
    settings.theme = formData.theme;
    settings.emailConfig = formData.emailConfig;

    const success = await saveSettings(settings);
    if (!success) throw new Error("Failed to write settings.json");

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "Settings updated successfully." };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: error.message || "Failed to update settings." };
  }
}

// 3. Hero Update
export async function updateHeroAction(data: HeroInfo) {
  try {
    const success = await saveHero(data);
    if (!success) throw new Error();
    revalidatePath("/");
    return { success: true, message: "Hero section updated successfully." };
  } catch (err) {
    return { success: false, message: "Failed to update hero details." };
  }
}

// 4. About Update
export async function updateAboutAction(data: AboutInfo) {
  try {
    const success = await saveAbout(data);
    if (!success) throw new Error();
    revalidatePath("/");
    return { success: true, message: "About section updated successfully." };
  } catch (err) {
    return { success: false, message: "Failed to update about details." };
  }
}

// 5. Skills Update
export async function updateSkillsAction(data: SkillCategory[]) {
  try {
    const success = await saveSkills(data);
    if (!success) throw new Error();
    revalidatePath("/");
    return { success: true, message: "Skills updated successfully." };
  } catch (err) {
    return { success: false, message: "Failed to update skills." };
  }
}

// 6. Experience Update
export async function updateExperienceAction(data: Experience[]) {
  try {
    const success = await saveExperience(data);
    if (!success) throw new Error();
    revalidatePath("/");
    return { success: true, message: "Experience timeline updated successfully." };
  } catch (err) {
    return { success: false, message: "Failed to update experience." };
  }
}

// 7. Projects Update
export async function updateProjectsAction(data: Project[]) {
  try {
    const success = await saveProjects(data);
    if (!success) throw new Error();
    revalidatePath("/");
    return { success: true, message: "Projects updated successfully." };
  } catch (err) {
    return { success: false, message: "Failed to update projects." };
  }
}

// 8. Education Update
export async function updateEducationAction(data: Education[]) {
  try {
    const success = await saveEducation(data);
    if (!success) throw new Error();
    revalidatePath("/");
    return { success: true, message: "Education updated successfully." };
  } catch (err) {
    return { success: false, message: "Failed to update education." };
  }
}

// 9. Achievements Update
export async function updateAchievementsAction(data: Achievements) {
  try {
    const success = await saveAchievements(data);
    if (!success) throw new Error();
    revalidatePath("/");
    return { success: true, message: "Achievements updated successfully." };
  } catch (err) {
    return { success: false, message: "Failed to update achievements." };
  }
}

// 9.5 Services Update
export async function updateServicesAction(data: Service[]) {
  try {
    const success = await saveServices(data);
    if (!success) throw new Error();
    revalidatePath("/");
    return { success: true, message: "Services updated successfully." };
  } catch (err) {
    return { success: false, message: "Failed to update services." };
  }
}

// 10. Contact Replies from Panel
export async function replyToContact(contactId: string, replyMessage: string) {
  try {
    const contacts = await getContacts();
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) {
      return { success: false, message: "Submission not found." };
    }

    const settings = await getSettings();
    const { smtpHost, smtpPort, smtpUser, smtpPass } = settings.emailConfig;

    if (!smtpHost || !smtpUser || !smtpPass) {
      return { success: false, message: "SMTP configuration is incomplete. Please setup SMTP in Settings first." };
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    } as any);

    const mailOptions = {
      from: `"${settings.admin.username} via Portfolio" <${smtpUser}>`,
      to: contact.email,
      subject: `Re: Portfolio Contact: ${contact.subject}`,
      text: `${replyMessage}\n\n---\nOn ${new Date(contact.createdAt).toLocaleDateString()}, you wrote:\n${contact.message}`,
      html: `
        <p>${replyMessage.replace(/\n/g, "<br>")}</p>
        <br>
        <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">
        <p style="color: #666; font-size: 13px;">
          <strong>On ${new Date(contact.createdAt).toLocaleString()}, you wrote:</strong><br>
          ${contact.message.replace(/\n/g, "<br>")}
        </p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Update state to replied in DB directly
    await markContactReplied(contactId);

    revalidatePath("/admin");
    return { success: true, message: "Reply sent successfully!" };
  } catch (error: any) {
    console.error("Reply Error:", error);
    return { success: false, message: error.message || "Failed to send email reply." };
  }
}

// Delete submission
export async function deleteContactSubmission(id: string) {
  try {
    await deleteContact(id);
    revalidatePath("/admin");
    return { success: true, message: "Submission deleted." };
  } catch (err) {
    return { success: false, message: "Failed to delete submission." };
  }
}

// 11. File Upload (For project screenshots & resume)
export async function uploadFileAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // 'screenshot' | 'resume' | 'profile'
    const projectId = formData.get("projectId") as string;

    if (!file) {
      return { success: false, message: "No file was uploaded." };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const publicDir = path.join(process.cwd(), "public");

    if (type === "resume") {
      const filePath = path.join(publicDir, "resume.pdf");
      fs.writeFileSync(filePath, buffer);
      revalidatePath("/");
      return { success: true, url: "/resume.pdf" };
    }

    if (type === "profile") {
      const ext = path.extname(file.name) || ".jpg";
      const timestamp = Date.now();
      const filename = `profile-${timestamp}${ext}`;
      const filePath = path.join(publicDir, filename);
      fs.writeFileSync(filePath, buffer);

      // Update hero json
      const hero = await getHeroAction();
      if (hero) {
        hero.profileImg = `/${filename}`;
        await saveHero(hero);
      }

      revalidatePath("/");
      return { success: true, url: `/${filename}` };
    }

    if (type === "screenshot" && projectId) {
      const ext = path.extname(file.name) || ".jpg";
      const filename = `project-${projectId}${ext}`;
      const uploadDir = path.join(publicDir, "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, buffer);

      // Update project json
      const projects = await getProjects();
      const project = projects.find((p) => p.id === projectId);
      if (project) {
        project.imageUrl = `/uploads/${filename}`;
        await saveProjects(projects);
      }

      revalidatePath("/");
      revalidatePath("/admin");
      return { success: true, url: `/uploads/${filename}` };
    }

    return { success: false, message: "Invalid upload type." };
  } catch (error: any) {
    console.error("Upload Error:", error);
    return { success: false, message: error.message || "Upload failed." };
  }
}

export async function loginAdmin(username: string, pass: string) {
  try {
    const settings = await getSettings();
    if (username !== settings.admin.username) {
      return { success: false, message: "Invalid username or password." };
    }

    const passwordMatch = bcrypt.compareSync(pass, settings.admin.passwordHash);
    if (!passwordMatch) {
      return { success: false, message: "Invalid username or password." };
    }

    const sessionToken = await createSession(username);
    const cookieStore = await cookies();
    cookieStore.set("portfolio_admin_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return { success: true, message: "Logged in successfully." };
  } catch (error: any) {
    console.error("Login action error:", error);
    return { success: false, message: "An unexpected login error occurred." };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("portfolio_admin_session");
  return { success: true };
}

export async function getSettingsAction() {
  return getSettings();
}

export async function getHeroAction() {
  return getHero();
}

export async function getAboutAction() {
  return getAbout();
}

export async function getSkillsAction() {
  return getSkills();
}

export async function getExperienceAction() {
  return getExperience();
}

export async function getProjectsAction() {
  return getProjects();
}

export async function getEducationAction() {
  return getEducation();
}

export async function getAchievementsAction() {
  return getAchievements();
}

export async function getContactsAction() {
  return getContacts();
}

export async function getServicesAction() {
  return getServices();
}
