
return (
  <MainLayout isSignedIn={true}>
    <div style={{ backgroundColor: "#e5e7eb", padding: "20px" }}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div className={styles.icon}></div>
            <h2>Service Authorization</h2>
          </div>
          <div className={styles.actions}>
            <Button onClick={handleClear} className={styles.clearBtn}>
              Clear
            </Button>
            <Button
              type="primary"
              onClick={handleSaveSelection}
              className={styles.saveBtn}
            >
              Save Selection
            </Button>
          </div>
        </div>

        <div className={styles.filters}>
          <Input placeholder="All" className={styles.filterInput} />
          <DatePicker
            format="DD/MM/YYYY"
            placeholder=""
            className={styles.datePicker}
          />
          <Input
            placeholder="SSN / Member ID"
            className={styles.searchInput}
          />
          <Button className={styles.SearchBtn} icon={<SearchOutlined />} />
        </div>

        <Table
          rowSelection={{
            type: "checkbox",
            selectedRowKeys,
            onChange: handleRowSelection,
          }}
          columns={columns}
          scroll={{ x: 768 }}
          dataSource={data}
          expandable={{
            expandedRowRender,
            expandedRowKeys,
            showExpandColumn: false,
          }}
          pagination={false}
          className={styles.table}
        />

        <CustomModal
          title="Create Template"
          open={isTemplateModalOpen}
          onCancel={closeTemplateModal}
          footer={modalFooter}
        >
          <Form form={templateForm} layout="vertical">
            <Form.Item
              name="templateName"
              label="Template Name"
              rules={[
                { required: true, message: "Please enter a template name" },
              ]}
            >
              <Input placeholder="Enter name of template" />
            </Form.Item>
          </Form>
        </CustomModal>
      </div>
    </div>
  </MainLayout>
);
