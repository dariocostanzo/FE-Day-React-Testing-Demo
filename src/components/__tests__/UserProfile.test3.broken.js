import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserProfile from "../UserProfile";
import axios from "axios";

jest.mock("axios");

describe("UserProfile - Test 3", () => {
    it("should display a Pokemon Profile after fetch", async () => {
        // Mock a successful API response
        axios.get.mockResolvedValue({
            data: { name: 'PokeJohnDoe', height: 123, weight: 30 }
        });

        render(<UserProfile />);

        const fetchButton = screen.getByRole("button", {
            name: /fetch pokemon/i,
        });
        fireEvent.click(fetchButton);

        waitFor(() => {
            expect(
                screen.getByText("PokeJohnDoe"),
            ).toBeInTheDocument();
            expect(
                screen.getByText("123cm"),
            ).toBeInTheDocument();
            expect(
                screen.getByText("30g"),
            ).toBeInTheDocument();
        });
    });
});
