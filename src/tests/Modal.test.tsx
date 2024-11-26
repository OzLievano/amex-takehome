import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal", () => {
  const mockClose = vi.fn();

  beforeEach(() => {
    mockClose.mockReset();
  });

  test("renders modal with expected controls", () => {
    render(
      <Modal onClose={mockClose} title="Test Modal">
        Test Content
      </Modal>
    );
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByRole("heading", { name: /test modal/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /close/i })).toBeTruthy();
  });

  describe("when passed onClose handler", () => {
    test("calls onClose action when pressing the ESC key", () => {
      render(
        <Modal onClose={mockClose} title="Test Modal">
          Test Content
        </Modal>
      );
      fireEvent.keyDown(screen.getByRole("dialog"), {
        key: "Escape",
        code: "Escape",
      });
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test("renders dismissible button that calls onClose action when clicked", async () => {
      render(
        <Modal onClose={mockClose} title="Test Modal">
          Test Content
        </Modal>
      );
      const closeButton = screen.getByRole("button", { name: /close/i });
      await fireEvent.click(closeButton);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test("calls onClose action when clicking outside of the modal", async () => {
      render(
        <Modal onClose={mockClose} title="Test Modal">
          Test Content
        </Modal>
      );
      const backdrop = screen.getByRole("dialog");
      await fireEvent.click(backdrop);
      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });
});
