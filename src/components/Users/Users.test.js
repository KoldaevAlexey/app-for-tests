import { render, screen, fireEvent } from "@testing-library/jest-dom";
import Users from "./Users";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");

describe("Users component", () => {
    let response;
    beforeEach(() => {
        response = {
            data: [
                {
                    id: 1,
                    name: "asd",
                },
                {
                    id: 2,
                    name: "asf",
                },
                {
                    id: 3,
                    name: "asg",
                },
            ],
        };
    });
    test("renders learn react link", async () => {
        axios.get.mockReturnValue(response);

        render(
            <MemoryRouter>
                <Users />
            </MemoryRouter>
        );

        const users = await screen.findAllByTestId("user-item");
        expect(users.length).toBe(3);
        expect(axios.get).toBeCalledTimes(1);
    });
});
