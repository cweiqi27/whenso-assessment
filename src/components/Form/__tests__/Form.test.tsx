import { render, screen } from "@/utils/test-utils";
import { z } from "zod";
import { Form, InputField } from "..";
import { Button } from "@/components/Element/Button";
import { vi } from "vitest";
import { fireEvent } from "@testing-library/dom";

const testData = {
  title: "Heyheyhey",
};

const schema = z.object({
  title: z.string().min(1),
});

const testFunc = (input: string) => {
  console.log(input);
};

describe("Form", () => {
  it("should render and submit a basic Form component", async () => {
    const mockCallback = vi.fn().mockImplementation(testFunc);

    render(
      <Form schema={schema} callback={mockCallback}>
        <InputField name="title" />
        <Button type="submit">Submit</Button>
      </Form>,
    );

    const formInput = screen.getByRole("textbox");
    fireEvent.change(formInput, { target: { value: testData.title } });

    const submit = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submit);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(testData);
  });

  it("should fails submission and not proceed with callback when validation fails", async () => {
    const mockCallback = vi.fn().mockImplementation(testFunc);

    render(
      <Form schema={schema} callback={mockCallback}>
        <InputField name="title" />
        <Button type="submit">Submit</Button>
      </Form>,
    );

    const formInput = screen.getByRole("textbox");
    fireEvent.change(formInput, { target: { value: "" } });

    const submit = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submit);

    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
});
