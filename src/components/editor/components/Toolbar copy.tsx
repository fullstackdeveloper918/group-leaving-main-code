import React from "react";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  ChevronDown,
  Palette,
  // Settings,
} from "lucide-react";
import { EditorState } from "../types/editor";

interface ToolbarProps {
  editorState: EditorState;
  updateEditorStyle: (style: Partial<EditorState>) => void;
  handleCommand: (command: string, value?: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  editorState,
  updateEditorStyle,
  handleCommand,
}) => {
  const fonts = [
    "Boogaloo",
    "Cabin Sketch",
    "Calligraffitti",
    "Caveat",
    "Chewy",
    "Concert One",
    "Flamenco",
    "Fredoka One",
    "Indie Flower",
    "Just Another Hand",
    "Just Me Again Down Here",
    "Nanum Pen Script",
    "Pacifico",
    "Playwrite IN",
    "Qwigley",
    "Reenie Beanie",
    "Satisfy",
    "Sue Ellen Francisco",
    "Vibur",
    "Zeyada",
    "Arial",
    "Comic Sans MS",
    "Verdana",
  ];
  const bodyFonts = [
    "Boogaloo",
    "Cabin Sketch",
    "Calligraffitti",
    "Caveat",
    "Chewy",
    "Concert One",
    "Flamenco",
    "Fredoka One",
    "Indie Flower",
    "Just Another Hand",
    "Just Me Again Down Here",
    "Nanum Pen Script",
    "Pacifico",
    "Playwrite IN",
    "Qwigley",
    "Reenie Beanie",
    "Satisfy",
    "Sue Ellen Francisco",
    "Vibur",
    "Zeyada",
    "Arial",
    "Comic Sans MS",
    "Verdana",
  ];
  const headingFonts = [
    "Abril Fatface",
    "Allerta Stencil",
    "Bebas Neue",
    "Bevan",
    "Bungee Inline",
    "Literata",
    "Ribeye Marrow",
    "Righteous",
    "Staatliches",
    "Times New Roman",
    "Courier New",
    "Georgia",
  ];

  const [showFontDropdown, setShowFontDropdown] = React.useState(false);
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  const buttonClass = "p-1.5 rounded hover:bg-gray-100 transition";
  const activeButtonClass =
    "p-1.5 rounded bg-blue-100 text-blue-700 transition";

  const changeFont = (font: string) => {
    updateEditorStyle({ fontFamily: font });
    handleCommand("fontName", font);
    setShowFontDropdown(false);
  };

  const changeColor = (color: string) => {
    updateEditorStyle({ color });
    handleCommand("foreColor", color);
    setShowColorPicker(false);
  };

  const renderFontList = (fonts: string[]) =>
    fonts.map((font) => (
      <button
        key={font}
        style={{ fontFamily: font }}
        className={`block w-full text-left px-3 py-2 text-sm ${
          editorState.fontFamily === font
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100"
        } transition`}
        onClick={() => changeFont(font)}
      >
        {font}
      </button>
    ));

  return (
    <div className="p-2 border-b bg-white flex items-center flex-wrap gap-1">
      {/* Font dropdown */}
      <div className="relative mr-1 flex items-center">
        <button
          onClick={() => setShowFontDropdown(!showFontDropdown)}
          className="flex items-center px-2 py-1 rounded hover:bg-gray-100 transition"
        >
          <Type size={16} className="mr-1" />
          <span
            style={{ fontFamily: editorState.fontFamily }}
            className="text-sm"
          >
            {editorState.fontFamily}
          </span>
          <ChevronDown size={14} className="ml-1" />
        </button>

        {showFontDropdown && (
          <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded z-10 w-48 max-h-72 overflow-auto p-2">
            <div>
              <div className="text-xs font-bold text-blue-800 px-2 mb-1">
                Body Fonts
              </div>
              {renderFontList(bodyFonts)}
            </div>

            <div className="mt-3">
              <div className="text-xs font-bold text-blue-800 px-2 mb-1">
                Heading Fonts
              </div>
              {renderFontList(headingFonts)}
            </div>
          </div>
        )}
      </div>

      {/* Text formatting */}
      <button
        onClick={() => handleCommand("bold")}
        className={buttonClass}
        aria-label="Bold"
      >
        <Bold size={18} />
      </button>

      <button
        onClick={() => handleCommand("italic")}
        className={buttonClass}
        aria-label="Italic"
      >
        <Italic size={18} />
      </button>

      {/* Alignment */}
      <div className="flex border-l border-r px-1 mx-1">
        <button
          onClick={() => handleCommand("justifyLeft")}
          className={buttonClass}
          aria-label="Align Left"
        >
          <AlignLeft size={18} />
        </button>

        <button
          onClick={() => handleCommand("justifyCenter")}
          className={buttonClass}
          aria-label="Align Center"
        >
          <AlignCenter size={18} />
        </button>

        <button
          onClick={() => handleCommand("justifyRight")}
          className={buttonClass}
          aria-label="Align Right"
        >
          <AlignRight size={18} />
        </button>
      </div>

      {/* Color picker */}
      <div className="relative">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className={buttonClass}
          style={{ color: editorState.color }}
          aria-label="Text Color"
        >
          <Palette size={18} />
        </button>

        {showColorPicker && (
          <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded p-2 z-10 grid grid-cols-5 gap-1">
            {[
              "#37CAEC",
              "#FF5757",
              "#8A3FFC",
              "#00B8A3",
              "#FF8A00",
              "#171717",
              "#6B7280",
            ].map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded-full border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => changeColor(color)}
                aria-label={`Color ${color}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      {/* <button className={buttonClass} aria-label="Settings">
        <Settings size={18} />
      </button> */}
    </div>
  );
};

export default Toolbar;
