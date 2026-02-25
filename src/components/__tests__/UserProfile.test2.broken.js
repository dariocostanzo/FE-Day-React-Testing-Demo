import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import UserProfile from "../UserProfile";

jest.mock("axios");

describe("UserProfile - Test 2", () => {
    it("should enable the 'Set Background' button after clicking the 'Fetch Pokemon' button", async () => {
        // Mock a successful API response
        axios.get.mockResolvedValue({
            data: { name: 'PokeJohnDoe', height: 123, weight: 30 }
        });

        const { container } = render(<UserProfile />);

        const fetchButton = screen.getByRole("button", {
            name: /fetch pokemon/i,
        });
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(
                container.querySelector(".duplicate-class-button"),
            ).toBeEnabled();
        });

        // await waitFor(() => {
        //     expect(screen.getByTestId("toggle-bg-button")).toBeEnabled();
        // });
    });
});
