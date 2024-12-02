import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

export default function LoginForm({ setShowLogin }) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful:", data);
        form.resetFields();
      } else {
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Prisijungimas</h2>
          <button
            onClick={() => setShowLogin(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <CloseOutlined className="w-6 h-6" />
          </button>
        </div>
        <Form form={form} name="register" onFinish={onFinish} layout="vertical">
          <FormItem
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </FormItem>

          <FormItem
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </FormItem>

          <FormItem>
            <Button type="primary" htmlType="submit">
              Registruotis
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}
