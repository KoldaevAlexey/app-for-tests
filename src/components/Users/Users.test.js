import { fireEvent } from "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Users from "./Users";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "../AppRouter/AppRouter"

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
                <AppRouter/>
                <Users/>
            </MemoryRouter>
        );

        const users = await screen.findAllByTestId("user-item");
        expect(users.length).toBe(3);
    });
});
