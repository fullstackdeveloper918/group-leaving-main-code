"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface FormState {
    personalInfo: { name: string; age: number; gender: string; address: string; city: string; country: string; };
    contactInfo: { email: string; phone: string; alternatePhone?: string; skypeId?: string; linkedinProfile?: string; facebookProfile?: string; };
    educationSkills: { education: string; experience: string; skills: string; certifications?: string; languages?: string; };
    projects: { projectTitle: string; projectDescription: string; technologies: string; role: string; duration: string; };
    jobPreferences: { jobRole: string; location: string; salaryExpectations: string; availability: string; noticePeriod: string; workFromHome: boolean; };
    references: { referenceName: string; referenceContact: string; referenceRelation: string; previousEmployer?: string; feedback?: string; feedbackLink?: string; };
    agreement: { agreed: boolean; comments?: string; };
  }
  const loadStateFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('formState');
      if (serializedState) {
        return JSON.parse(serializedState);
      }
    } catch (err) {
      console.error('Failed to load state from localStorage', err);
    }
    return undefined;
  };
  const initialState: FormState = loadStateFromLocalStorage() || {
    personalInfo: { name: '', age: 0, gender: '', address: '', city: '', country: '' },
    contactInfo: { email: '', phone: '', alternatePhone: '', skypeId: '', linkedinProfile: '', facebookProfile: '' },
    educationSkills: { education: '', experience: '', skills: '', certifications: '', languages: '' },
    projects: { projectTitle: '', projectDescription: '', technologies: '', role: '', duration: '' },
    jobPreferences: { jobRole: '', location: '', salaryExpectations: '', availability: '', noticePeriod: '', workFromHome: false },
    references: { referenceName: '', referenceContact: '', referenceRelation: '', previousEmployer: '', feedback: '', feedbackLink: '' },
    agreement: { agreed: false, comments: '' },
  };
const loadInitialState = () => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : {};
  }
  return {};
};
// const initialState = loadInitialState();

// Create the form slice
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    autoSaveForm: (state, action) => {
      const updatedState = { ...state, ...action.payload };
      // Save to localStorage
      localStorage.setItem("formData", JSON.stringify(updatedState));
      return updatedState;
    },
    // clearFormData: () => {
    //   // Clear localStorage (client-side only)
    //   if (typeof window !== "undefined") {
    //     localStorage.removeItem("formData");
    //   }
    //   return {};
    // },
    clearSpecificFormData: (state, action) => {
      const fieldsToClear = action.payload; // Array of keys to clear
      const updatedState:any = { ...state };

      fieldsToClear.forEach((field: any) => {
        delete updatedState[field];
      });

      // Update localStorage with the cleaned data
      localStorage.setItem("formData", JSON.stringify(updatedState));
      return updatedState;
    },
    updatePersonalInfo: (state, action: PayloadAction<any['personalInfo']>) => {
        state.personalInfo = action.payload;
      },
      updateContactInfo: (state, action: PayloadAction<any['contactInfo']>) => {
        state.contactInfo = action.payload;
      },
      updateEducationSkills: (state, action: PayloadAction<any['educationSkills']>) => {
        state.educationSkills = action.payload;
      },
      updateProjects: (state, action: PayloadAction<any['projects']>) => {
        state.projects = action.payload;
      },
      updateJobPreferences: (state, action: PayloadAction<any['jobPreferences']>) => {
        state.jobPreferences = action.payload;
      },
      updateReferences: (state, action: PayloadAction<any['references']>) => {
        state.references = action.payload;
      },
      updateAgreement: (state, action: PayloadAction<any['agreement']>) => {
        state.agreement = action.payload;
      },
      clearForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => {
      // Save the form state to local storage whenever it changes
      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('formState', serializedState);
      } catch (err) {
        console.error('Failed to save state to localStorage', err);
      }
    });
  },
});

export const { autoSaveForm, clearSpecificFormData, updatePersonalInfo,
    updateContactInfo,
    updateEducationSkills,
    updateProjects,
    updateJobPreferences,
    updateReferences,
    updateAgreement,clearForm, } =
  formSlice.actions;
export default formSlice.reducer;
