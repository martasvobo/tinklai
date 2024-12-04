import { CloseOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

export default function LoginForm({ setShowLogin, setUser }) {
  const [form] = Form.useForm();

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
        <Form form={form} layout="vertical">
          <FormItem
            name="username"
            label="Username"
            rules={[{ required: true, message: "Įveskita prisijungimo vardą" }]}
          >
            <Input />
          </FormItem>
          <FormItem
            name="password"
            label="Password"
            rules={[{ required: true, message: "Įveskite slaptažodį" }]}
          >
            <Input.Password />
          </FormItem>
          <Button
            type="primary"
            onClick={() => {
              form
                .validateFields()
                .then(() => {
                  const values = form.getFieldsValue();
                  return fetch("http://localhost:3000/api/users/login", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  });
                })
                .then((response) => response.json())
                .then((data) => {
                  form.resetFields();
                  console.log(data);
                  setShowLogin(false);
                  setUser(data.user);
                  alert(data.message);
                })
                .catch((error) => {
                  console.error("Error:", error);
                  alert("Prisijungimas nepavyko");
                });
            }}
          >
            Prisijungti
          </Button>
          <Divider type="vertical" />
          <Button
            onClick={() => {
              form
                .validateFields()
                .then(() => {
                  const values = form.getFieldsValue();
                  return fetch("http://localhost:3000/api/users/register", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                  });
                })
                .then((response) => response.json())
                .then((data) => {
                  form.resetFields();
                  console.log(data);
                  setShowLogin(false);
                  setUser(data.user);
                  alert(data.message);
                })
                .catch((error) => {
                  console.error("Error:", error);
                  alert("Registracija nepavyko");
                });
            }}
          >
            Registruotis
          </Button>
        </Form>
      </div>
    </div>
  );
}
