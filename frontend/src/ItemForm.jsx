import { Modal, Form, Input, InputNumber, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";

export default function ItemForm({ visible, onCancel, onSubmit, product }) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };

  useEffect(() => {
    if (product) {
      product.nuotrauka = [{ uid: "-1", thumbUrl: product.nuotrauka }];
      form.setFieldsValue(product);
    }
  }, [product, form]);

  return (
    <Modal
      title="Pridėti prekę"
      open={visible}
      onCancel={onCancel}
      okText="Pateikti"
      cancelText="Atšaukti"
      onOk={handleSubmit}
      className="w-96"
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item
          name="pavadinimas"
          label="Pavadinimas"
          rules={[{ required: true, message: "Įveskite pavadinimą" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="kaina"
          label="Kaina"
          rules={[{ required: true, message: "Įveskite kainą" }]}
        >
          <InputNumber className="w-full" precision={2} />
        </Form.Item>

        <Form.Item
          name="nuotrauka"
          label="Paveiksliukas"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e?.fileList;
          }}
        >
          <Upload listType="picture-card" maxCount={1}>
            <div>
              <PlusOutlined />
              <div className="mt-2">Įkelti</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
