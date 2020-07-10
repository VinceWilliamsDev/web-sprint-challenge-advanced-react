import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    const form = render(<CheckoutForm />)
    const h2 = form.queryByText(/checkout form/i)
    expect(h2).toBeInTheDocument()
    expect(h2).toHaveTextContent(/checkout form/i)

    console.log(h2.textContent)
});

test("form shows success message on submit with form details", async () => {
    const form = render(<CheckoutForm />)
    const firstNameInput = form.getByLabelText('First Name:')
    const lastNameInput = form.getByLabelText('Last Name:')
    const addressInput = form.getByLabelText('Address:')
    const cityInput = form.getByLabelText('City:')
    const stateInput = form.getByLabelText('State:')
    const zipInput = form.getByLabelText('Zip:')
    const checkoutButton = form.getByRole('button')

    fireEvent.change(firstNameInput, {target: {value: 'Bob'}})
    fireEvent.change(lastNameInput, {target: {value: 'Roberts'}})
    fireEvent.change(addressInput, {target: {value: '123 Home Blvd'}})
    fireEvent.change(cityInput, {target: {value: 'Anywhere'}})
    fireEvent.change(stateInput, {target: {value: 'Everywhere'}})
    fireEvent.change(zipInput, {target: {value: '12345'}})

    fireEvent.click(checkoutButton)

    
    await waitFor(() => {
        const successMessage = form.queryByTestId(/successmessage/i)

        expect(successMessage).toBeInTheDocument()
        expect(successMessage).toHaveTextContent(/bob/i)
        expect(successMessage).toHaveTextContent(/roberts/i)
        expect(successMessage).toHaveTextContent(/123 Home Blvd/i)
        expect(successMessage).toHaveTextContent(/Anywhere/i)
        expect(successMessage).toHaveTextContent(/Everywhere/i)
        expect(successMessage).toHaveTextContent(/12345/i)

    })
});
