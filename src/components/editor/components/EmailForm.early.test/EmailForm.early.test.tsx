import React from 'react'
import EmailForm from '../EmailForm';
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Save: (props: any) => <svg data-testid="save-icon" {...props} />,
  Info: (props: any) => <svg data-testid="info-icon" {...props} />,
}));

describe('EmailForm() EmailForm method', () => {
  // Happy paths
  describe("Happy paths", () => {
    test("renders the form with input, info button, and action buttons", () => {
      // This test ensures the form renders all expected elements.
      render(<EmailForm onCancel={jest.fn()} onSave={jest.fn()} />);
      expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/your email/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /information/i })).toBeInTheDocument();
      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      expect(screen.getByText(/save/i)).toBeInTheDocument();
      expect(screen.getByTestId("save-icon")).toBeInTheDocument();
      expect(screen.getByTestId("info-icon")).toBeInTheDocument();
    });

    test("calls onCancel when Cancel button is clicked", () => {
      // This test ensures the onCancel callback is called when Cancel is clicked.
      const onCancel = jest.fn();
      render(<EmailForm onCancel={onCancel} onSave={jest.fn()} />);
      fireEvent.click(screen.getByText(/cancel/i));
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    test("calls onSave with email and then onCancel when Save button is clicked", () => {
      // This test ensures onSave is called with the correct email and onCancel is called after.
      const onSave = jest.fn();
      const onCancel = jest.fn();
      render(<EmailForm onCancel={onCancel} onSave={onSave} />);
      const input = screen.getByPlaceholderText(/your email/i);
      fireEvent.change(input, { target: { value: "test@example.com" } });
      fireEvent.click(screen.getByText(/save/i));
      expect(onSave).toHaveBeenCalledWith("test@example.com");
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    test("shows info tooltip when info button is clicked and hides when clicked again", () => {
      // This test ensures the info tooltip toggles visibility on button click.
      render(<EmailForm onCancel={jest.fn()} onSave={jest.fn()} />);
      const infoButton = screen.getByRole("button", { name: /information/i });
      fireEvent.click(infoButton);
      expect(
        screen.getByText(/your email is used to send you a copy of your message/i)
      ).toBeInTheDocument();
      fireEvent.click(infoButton);
      expect(
        screen.queryByText(/your email is used to send you a copy of your message/i)
      ).not.toBeInTheDocument();
    });

    test("input value updates as user types", () => {
      // This test ensures the input value updates with user input.
      render(<EmailForm onCancel={jest.fn()} onSave={jest.fn()} />);
      const input = screen.getByPlaceholderText(/your email/i) as HTMLInputElement;
      fireEvent.change(input, { target: { value: "user@domain.com" } });
      expect(input.value).toBe("user@domain.com");
    });

    test("renders without onSave and only calls onCancel when Save is clicked", () => {
      // This test ensures that if onSave is not provided, only onCancel is called.
      const onCancel = jest.fn();
      render(<EmailForm onCancel={onCancel} />);
      fireEvent.click(screen.getByText(/save/i));
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  // Edge cases
  describe("Edge cases", () => {
    test("calls onSave with empty string if input is empty and Save is clicked", () => {
      // This test ensures onSave is called with an empty string if no email is entered.
      const onSave = jest.fn();
      const onCancel = jest.fn();
      render(<EmailForm onCancel={onCancel} onSave={onSave} />);
      fireEvent.click(screen.getByText(/save/i));
      expect(onSave).toHaveBeenCalledWith("");
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    test("handles rapid toggling of info tooltip", () => {
      // This test ensures rapid toggling of the info tooltip does not break the component.
      render(<EmailForm onCancel={jest.fn()} onSave={jest.fn()} />);
      const infoButton = screen.getByRole("button", { name: /information/i });
      fireEvent.click(infoButton);
      expect(
        screen.getByText(/your email is used to send you a copy of your message/i)
      ).toBeInTheDocument();
      fireEvent.click(infoButton);
      expect(
        screen.queryByText(/your email is used to send you a copy of your message/i)
      ).not.toBeInTheDocument();
      fireEvent.click(infoButton);
      expect(
        screen.getByText(/your email is used to send you a copy of your message/i)
      ).toBeInTheDocument();
    });

    test("does not throw if onSave is not provided and Save is clicked", () => {
      // This test ensures the component does not throw if onSave is missing.
      const onCancel = jest.fn();
      render(<EmailForm onCancel={onCancel} />);
      expect(() => {
        fireEvent.click(screen.getByText(/save/i));
      }).not.toThrow();
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    test("does not throw if onCancel is provided but onSave is not and Cancel is clicked", () => {
      // This test ensures the component does not throw if only onCancel is provided.
      const onCancel = jest.fn();
      render(<EmailForm onCancel={onCancel} />);
      expect(() => {
        fireEvent.click(screen.getByText(/cancel/i));
      }).not.toThrow();
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    test("handles unusual email input (edge case: special characters)", () => {
      // This test ensures the input accepts and passes through special character emails.
      const onSave = jest.fn();
      const onCancel = jest.fn();
      render(<EmailForm onCancel={onCancel} onSave={onSave} />);
      const input = screen.getByPlaceholderText(/your email/i);
      fireEvent.change(input, { target: { value: "üñîçødë@exämple.com" } });
      fireEvent.click(screen.getByText(/save/i));
      expect(onSave).toHaveBeenCalledWith("üñîçødë@exämple.com");
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });
});