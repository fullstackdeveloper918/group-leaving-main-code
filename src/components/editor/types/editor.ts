export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EditorState {
  content: string;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  color: string;
  isEditing: boolean;
  showEmailForm: boolean;
}
export interface Element {
  type: "text" | "image" | "gif"; // Types of elements
  content: string;
  slideIndex: number;
  x: number;
  y: number;
  user_uuid?: string; // Optional, if it's required in some cases
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  color: string;
}

export interface EditorImageState {
  content: string;
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  color: string;
  isEditing: boolean;
  showEmailForm: boolean;
  width: number; // Default width in number
  height: number;
}
export interface ImageElement {
  type: "text" | "image" | "gif"; // Types of elements
  content: string;
  slideIndex: number;
  x: number;
  y: number;
  user_uuid?: string; // Optional, if it's required in some cases
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  color: string;
  width: number; // default width agar nahi mila to
  height: number; // default height
}
