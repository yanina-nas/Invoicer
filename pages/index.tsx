import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import moment, { Moment } from "moment";
import {
  DatePicker,
  Select,
  Col,
  Row,
  Button,
  Checkbox,
  Form,
  Input,
} from "antd";
import "antd/dist/antd.css";
import {
  LeftOutlined,
  RightOutlined,
  PrinterOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Box,
  Flex,
} from "@chakra-ui/react";
import Home from "./Home";
import { Dictionary, ExtraExpensesEntry, TimesheetEntry } from "./common/types";
import {
  DEFAULT_WORKING_DAY_HOURS,
  getDaysFromRange,
  keysToDictionary,
  ONE,
  DEFAULT_HOURLY_RATE,
  ZERO,
} from "./common/utils";
import {
  BankAccountInfoLabels,
  ContactInfoLabels,
  Currency,
} from "./common/enums";
import { Card } from "antd";


const DEFAULT_TIMESHEET_ENTRY: TimesheetEntry = {
  hours: 0,
  rate: 0,
};

const DEFAULT_EXTRA_EXPENSES_ENTRY: ExtraExpensesEntry = {
  item: "",
  amount: 0,
};

const Example: React.FC = (): JSX.Element => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [showControls, setShowControls] = useState(false);
  const [currency, setCurrency] = useState<Currency>(Currency.Dollar);
  const [showExtraExpenses, setShowExtraExpenses] = useState(false);
  const handleToggleShowControls = (): void => setShowControls(!showControls);
  const handleToggleExtraExpenses = (): void =>
    setShowExtraExpenses(!showExtraExpenses);
  const [defaultClient, setDefaultClient] = useState(true);
  const handleSwitchClient = (): void => {
    // setHours(defaultClient ? DEFAULT_WORKING_DAY_HOURS : ONE);
    defaultClient ? setDefaultClient(false) : setDefaultClient(true);
    // setClientName(defaultClient ? "" : "");
    // setInvoiceNumberPrefix(defaultClient ? "" : "");
    // setRate(ZERO); // (defaultClient ? DEFAULT_HOURLY_RATE : DEFAULT_DAILY_RATE);
    // setCurrency(defaultClient ? Currency.Euro : Currency.Dollar);
    // setClientAddressLineOne(defaultClient ? "" : "");
    // setClientAddressLineTwo(defaultClient ? "" : "");
    // setClientPhone(defaultClient ? "" : "");
    // setClientEmail(defaultClient ? "" : "");
    // setBeneficiaryAccount(defaultClient ? "" : "");
    // setIntermediaryBankAccount(defaultClient ? "" : "");
    // setAgreementSigningDate(defaultClient ? moment() : moment());
  };

  const [startDate, setStartDate] = useState<Moment | null>(null); // (moment().subtract(1, "months").date(1));
  const [endDate, setEndDate] = useState<Moment | null>(null); // (moment().subtract(1, "months").date(0));
  const [workdaysFilter, setWorkdaysFilter] = useState(true);
  const [rate, setRate] = useState(ZERO); //(DEFAULT_HOURLY_RATE);
  const [hours, setHours] = useState(ZERO); //(DEFAULT_WORKING_DAY_HOURS);

  const [focusedAgreementSigningDate, setFocusedAgreementSigningDate] =
    useState<boolean>(false);
  const [agreementSigningDate, setAgreementSigningDate] =
    useState<Moment | null>(moment());

  const [focusedInvoiceDate, setFocusedInvoiceDate] = useState<boolean>(false);
  const [invoiceDate, setInvoiceDate] = useState<Moment | null>(moment());

  const [invoiceNumberPrefix, setInvoiceNumberPrefix] = useState<string>("");

  const [consultantName, setConsultantName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");

  const [consultantAddressLineOne, setConsultantAddressLineOne] =
    useState<string>("");
  const [consultantAddressLineTwo, setConsultantAddressLineTwo] =
    useState<string>("");
  const [consultantPhone, setConsultantPhone] = useState<string>("");
  const [consultantEmail, setConsultantEmail] = useState<string>("");
  const [clientAddressLineOne, setClientAddressLineOne] = useState<string>("");
  const [clientAddressLineTwo, setClientAddressLineTwo] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");

  // { [x: string]: TimesheetEntry | { hours?: number | undefined; rate?: number | undefined; } | undefined; }
  const [timesheetData, setTimesheetData] = useState<Dictionary<string, TimesheetEntry>>({});
  const [extraExpensesData, setExtraExpensesData] = useState<Dictionary<string, ExtraExpensesEntry>>({});

  const [beneficiary, setBeneficiary] = useState<string>("");
  const [beneficiaryAltName, setBeneficiaryAltName] = useState<string>("");
  const [beneficiaryAccount, setBeneficiaryAccount] = useState<string>("");
  const [intermediaryBank, setIntermediaryBank] = useState<string>("");
  const [intermediaryBankSwift, setIntermediaryBankSwift] =
    useState<string>("");
  const [intermediaryBankAccount, setIntermediaryBankAccount] =
    useState<string>("");
  const [beneficiaryBank, setBeneficiaryBank] = useState<string>("");
  const [beneficiaryBankSwift, setBeneficiaryBankSwift] = useState<string>("");
  const [beneficiaryBankAddress, setBeneficiaryBankAddress] =
    useState<string>("");
  const { RangePicker } = DatePicker;

  const handleDatesChange = (
    date: [Moment | null, Moment | null] | null,
    dateString: [string, string]
  ): void => {
    setStartDate(date ? date[0] : null);
    setEndDate(date ? date[1] : null);
  };

  const { Option } = Select;
  const selectCurrency = (
    <Select
      value={currency}
      onChange={(event) => setCurrency(event as Currency)}
      style={{ width: 60 }}
    >
      <Option value={Currency.Dollar}>$</Option>
      <Option value={Currency.Euro}>€</Option>
    </Select>
  );

  const handleToggleWorkdaysFilter = (): void =>
    workdaysFilter ? setWorkdaysFilter(false) : setWorkdaysFilter(true);

  const toggleShowPreview = (): void =>
    showPreview ? setShowPreview(false) : setShowPreview(true);
  const handleShowPreview = (): void => {
    handleTimesheetSetup();
    toggleShowPreview();
  };

  const onUpdateTimesheetField = (
    timesheetData: Dictionary<string, TimesheetEntry>,
    fieldName: string,
    chosenTimestampKey: string,
    newValue: string
  ): void => {
    const updatedTimesheetData: Dictionary<string, TimesheetEntry> = {
      ...timesheetData,
      [chosenTimestampKey]: {
        ...(timesheetData[chosenTimestampKey] || DEFAULT_TIMESHEET_ENTRY),
        [fieldName]: Number(newValue),
      },
    };
    setTimesheetData(updatedTimesheetData);
  };

  const onCreateTimesheetEntry = (
    timesheetData: Dictionary<string, TimesheetEntry>
  ): void => {
    const nextDayTimestampKey: string = moment(
      Object.keys(timesheetData)[Object.keys(timesheetData).length - ONE]
    )
      .add(ONE, "days")
      .format("YYYY-MM-DD");
    const todayTimestampKey = moment().format("YYYY-MM-DD");
    const rateOfPreviousEntry: number | undefined =
      timesheetData[
        Object.keys(timesheetData)[Object.keys(timesheetData).length - ONE]
      ]?.rate;
    const workingHoursOfPreviousEntry: number | undefined =
      timesheetData[
        Object.keys(timesheetData)[Object.keys(timesheetData).length - ONE]
      ]?.hours;
    const updatedTimesheetData = {
      ...timesheetData,
      [nextDayTimestampKey || todayTimestampKey]: {
        hours: workingHoursOfPreviousEntry || DEFAULT_WORKING_DAY_HOURS,
        rate: rateOfPreviousEntry || DEFAULT_HOURLY_RATE,
      },
    };
    setTimesheetData(updatedTimesheetData);
  };

  const onDeleteTimesheetEntry = (
    timesheetData: Dictionary<string, TimesheetEntry>,
    chosenTimestampKey: string
  ): void => {
    const updatedTimesheetData = Object.keys(timesheetData).reduce(
      (updatedTimesheetData, timestampKey) => {
        return timestampKey === chosenTimestampKey
          ? updatedTimesheetData
          : {
              ...updatedTimesheetData,
              [timestampKey]: timesheetData[timestampKey],
            };
      },
      {}
    );
    setTimesheetData(updatedTimesheetData);
  };

  const handleTimesheetSetup = (): void => {
    setTimesheetData(
      keysToDictionary(getDaysFromRange(startDate, endDate, workdaysFilter), {
        rate: rate,
        hours: hours,
      })
    );
  };

  const onUpdateExtraExpensesField = (
    extraExpensesData: Dictionary<string, ExtraExpensesEntry>,
    chosenEntryKey: string,
    fieldName: string,
    newValue: string
  ): void => {
    const updatedExtraExpensesData: Dictionary<string, ExtraExpensesEntry> = {
      ...extraExpensesData,
      [chosenEntryKey]: {
        ...(extraExpensesData[chosenEntryKey] || DEFAULT_EXTRA_EXPENSES_ENTRY),
        [fieldName]: fieldName === "amount" ? Number(newValue) : newValue,
      },
    };
    setExtraExpensesData(updatedExtraExpensesData);
  };

  const onCreateExtraExpensesEntry = (
    extraExpensesData: Dictionary<string, ExtraExpensesEntry>
  ): void => {
    const nextDayTimestampKey = moment(
      Object.keys(extraExpensesData)[
        Object.keys(extraExpensesData).length - ONE
      ]
    )
      .add(ONE, "days")
      .format("YYYY-MM-DD");
    const todayTimestampKey = moment().format("YYYY-MM-DD");
    const updatedExtraExpensesData = {
      ...extraExpensesData,
      [nextDayTimestampKey || todayTimestampKey]: {
        item: "",
        amount: 0,
      },
    };
    setExtraExpensesData(updatedExtraExpensesData);
  };

  const onDeleteExtraExpensesEntry = (
    extraExpensesData: Dictionary<string, ExtraExpensesEntry>,
    chosenEntryKey: string
  ): void => {
    const updatedExtraExpensesData = Object.keys(extraExpensesData).reduce(
      (updatedExtraExpensesData, entryKey) => {
        return entryKey === chosenEntryKey
          ? updatedExtraExpensesData
          : {
              ...updatedExtraExpensesData,
              [entryKey]: extraExpensesData[entryKey],
            };
      },
      {}
    );
    setExtraExpensesData(updatedExtraExpensesData);
  };

  return (
    <Flex
      direction={"column"}
      padding={12}
      backgroundColor={"#e8ebf2"}
      justify={"center"}
    >
      <Card title="Invoicer">
        <div className="site-card-wrapper">
          <Card
            type="inner"
            title="Invoice builder"
            extra={
              <Button.Group>
                <Button onClick={handleShowPreview}>
                  {showPreview && <LeftOutlined />}
                  {showPreview ? "Go back" : "Show preview"}
                </Button>
                {showPreview && (
                  <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                    {"I'm done. Print this!"}
                    <RightOutlined />
                  </Button>
                )}
              </Button.Group>
            }
          >
            {!showPreview && (
              <>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card title="Timeline setup">
                      <Form
                        layout={"vertical"}
                        name="basic"
                        initialValues={{ remember: true }}
                        autoComplete="off"
                      >
                        <Form.Item
                          label={"Invoice number"}
                          name="invoiceNumberPrefix"
                        >
                          <Input
                            placeholder={"Enter invoice number prefix"}
                            id={"invoiceNumberPrefix"}
                            onChange={(e) =>
                              setInvoiceNumberPrefix(e.target.value)
                            }
                            value={invoiceNumberPrefix}
                          />
                        </Form.Item>
                        <Form.Item label={"Invoice date"}>
                          <DatePicker
                            showToday
                            value={invoiceDate}
                            onChange={(chosenDate) =>
                              setInvoiceDate(chosenDate)
                            }
                          />
                        </Form.Item>

                        <Form.Item label={"Select date range"}>
                          <RangePicker
                            // size={"large"}
                            ranges={{
                              "Previous Month": [
                                moment().subtract(1, "month").startOf("month"),
                                moment().subtract(1, "month").endOf("month"),
                              ],
                              "This Month": [
                                moment().startOf("month"),
                                moment().endOf("month"),
                              ],
                            }}
                            placeholder={["From", "To"]}
                            onChange={handleDatesChange}
                            value={[startDate, endDate]}
                            // isDayBlocked={(momentDate) =>
                            //   workdaysFilter && (momentDate.format("d") === "0" || momentDate.format("d") === "6")
                            // }
                          />
                          <Checkbox
                            style={{ margin: 4 }}
                            id={"disable-saturdays-and-sundays"}
                            onChange={handleToggleWorkdaysFilter}
                          >
                            {"Include Saturdays and Sundays"}
                          </Checkbox>
                        </Form.Item>
                      </Form>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Client info">
                      <Form.Item name="clientName" label="Company name">
                        <Input
                          placeholder={"Enter company name"}
                          id={"clientName"}
                          onChange={(e) => setClientName(e.target.value)}
                          value={clientName}
                        />
                      </Form.Item>
                      <Form.Item name="clientAddress" label="Address">
                        <Input
                          placeholder={"Country, state, city, zip"}
                          id={"clientAddressLineOne"}
                          onChange={(e) =>
                            setClientAddressLineOne(e.target.value)
                          }
                          value={clientAddressLineOne}
                        />
                        <Input
                          placeholder={"Street, building"}
                          id={"clientAddressLineTwo"}
                          onChange={(e) =>
                            setClientAddressLineTwo(e.target.value)
                          }
                          value={clientAddressLineTwo}
                        />
                      </Form.Item>
                      <Form.Item name="clientPhone" label="Phone number">
                        <Input
                          placeholder={"Enter client phone number"}
                          id={"clientPhone"}
                          onChange={(e) => setClientPhone(e.target.value)}
                          value={clientPhone}
                        />
                      </Form.Item>
                      <Form.Item name="clientEmail" label="Email">
                        <Input
                          placeholder={"Enter client email"}
                          id={"clientEmail"}
                          onChange={(e) => setClientEmail(e.target.value)}
                          value={clientEmail}
                        />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Consultant info">
                      <Form.Item name="consultantName" label="Consultant name">
                        <Input
                          placeholder={"Enter consultant name"}
                          id={"consultantName"}
                          onChange={(e) => setConsultantName(e.target.value)}
                          value={consultantName}
                        />
                      </Form.Item>
                      <Form.Item name="consultantAddress" label="Address">
                        <Input
                          placeholder={"Country, state, city, zip"}
                          id={"consultantAddressLineOne"}
                          onChange={(e) =>
                            setConsultantAddressLineOne(e.target.value)
                          }
                          value={consultantAddressLineOne}
                        />
                        <Input
                          placeholder={"Street, building"}
                          id={"consultantAddressLineTwo"}
                          onChange={(e) =>
                            setConsultantAddressLineTwo(e.target.value)
                          }
                          value={consultantAddressLineTwo}
                        />
                      </Form.Item>
                      <Form.Item name="consultantPhone" label="Phone number">
                        <Input
                          placeholder={"Enter consultant phone number"}
                          id={"consultantPhone"}
                          onChange={(e) => setConsultantPhone(e.target.value)}
                          value={consultantPhone}
                        />
                      </Form.Item>
                      <Form.Item name="consultantEmail" label="Email">
                        <Input
                          placeholder={"Enter consultant email"}
                          id={"consultantEmail"}
                          onChange={(e) => setConsultantEmail(e.target.value)}
                          value={consultantEmail}
                        />
                      </Form.Item>
                    </Card>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Card title="Details">
                      <Form
                        layout={"vertical"}
                        name="basic"
                        initialValues={{ remember: true }}
                        autoComplete="off"
                      >
                        <Row gutter={16}>
                          <Col span={8}>
                            <Form.Item label={"Agreement signing date"}>
                              <DatePicker
                                value={agreementSigningDate}
                                onChange={(chosenDate) =>
                                  setAgreementSigningDate(chosenDate)
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            {defaultClient && (
                              <Form.Item
                                label="Working hours per day"
                                name="hours"
                              >
                                <Input
                                  placeholder={"Enter working hours value"}
                                  id={"hours"}
                                  onChange={(e) =>
                                    setHours(Number(e.target.value))
                                  }
                                  value={hours}
                                />
                              </Form.Item>
                            )}
                          </Col>
                          <Col span={8}>
                            <Form.Item name="rate" label="Hourly rate">
                              <Input
                                id={"rate"}
                                onChange={(e) =>
                                  setRate(Number(e.target.value))
                                }
                                addonAfter={selectCurrency}
                                value={rate}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </Card>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <Card title="Bank account information">
                      <Form
                        layout={"vertical"}
                        name="basic"
                        initialValues={{ remember: true }}
                        autoComplete="off"
                      >
                        <Row gutter={16}>
                          <Col span={8}>
                            <Form.Item
                              label={"Beneficiary:"}
                              name="beneficiary"
                            >
                              <Input
                                placeholder={"Enter beneficiary name"}
                                id={"beneficiary"}
                                onChange={(e) => setBeneficiary(e.target.value)}
                                value={beneficiary}
                              />
                            </Form.Item>
                            <Form.Item
                              label={"Beneficiary (alternative):"}
                              name="beneficiaryAltName"
                            >
                              <Input
                                placeholder={
                                  "Enter alternative name (optional)"
                                }
                                id={"beneficiaryAltName"}
                                onChange={(e) =>
                                  setBeneficiaryAltName(e.target.value)
                                }
                                value={beneficiaryAltName}
                              />
                            </Form.Item>
                            <Form.Item
                              label={"Beneficiary's account:"}
                              name="beneficiaryAccount"
                            >
                              <Input
                                placeholder={"Enter beneficiary account"}
                                id={"beneficiaryAccount"}
                                onChange={(e) =>
                                  setBeneficiaryAccount(e.target.value)
                                }
                                value={beneficiaryAccount}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label={"Intermediary bank:"}
                              name="intermediaryBank"
                            >
                              <Input
                                placeholder={"Enter intermediary bank name"}
                                id={"intermediaryBank"}
                                onChange={(e) =>
                                  setIntermediaryBank(e.target.value)
                                }
                                value={intermediaryBank}
                              />
                            </Form.Item>
                            <Form.Item
                              label={"Intermediary bank SWIFT:"}
                              name="intermediaryBankSwift"
                            >
                              <Input
                                placeholder={"Enter intermediary bank SWIFT"}
                                id={"intermediaryBankSwift"}
                                onChange={(e) =>
                                  setIntermediaryBankSwift(e.target.value)
                                }
                                value={intermediaryBankSwift}
                              />
                            </Form.Item>
                            <Form.Item
                              label={"Intermediary bank account:"}
                              name="intermediaryBankAccount"
                            >
                              <Input
                                placeholder={"Enter intermediary bank account"}
                                id={"intermediaryBankAccount"}
                                onChange={(e) =>
                                  setIntermediaryBankAccount(e.target.value)
                                }
                                value={intermediaryBankAccount}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              label={"Beneficiary bank:"}
                              name="beneficiaryBank"
                            >
                              <Input
                                placeholder={"Enter beneficiary bank name"}
                                id={"beneficiaryBank"}
                                onChange={(e) =>
                                  setBeneficiaryBank(e.target.value)
                                }
                                value={beneficiaryBank}
                              />
                            </Form.Item>
                            <Form.Item
                              label={"Beneficiary bank SWIFT:"}
                              name="beneficiaryBankSwift"
                            >
                              <Input
                                placeholder={"Enter beneficiary bank name"}
                                id={"beneficiaryBankSwift"}
                                onChange={(e) =>
                                  setBeneficiaryBankSwift(e.target.value)
                                }
                                value={beneficiaryBankSwift}
                              />
                            </Form.Item>
                            <Form.Item
                              label={"Beneficiary bank address:"}
                              name="beneficiaryBankAddress"
                            >
                              <Input
                                placeholder={"Enter beneficiary bank name"}
                                id={"beneficiaryBankAddress"}
                                onChange={(e) =>
                                  setBeneficiaryBankAddress(e.target.value)
                                }
                                value={beneficiaryBankAddress}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </>
            )}
            {showPreview && (
              <Box margin={5} borderRadius={20}>
                <Flex background={"white"} borderRadius={20}>
                  <Row gutter={16}>
                    <Col>
                      <Card hoverable>
                        <Box flex={1} ref={componentRef}>
                          <Home
                            defaultClient={defaultClient}
                            consultantName={consultantName}
                            clientName={clientName}
                            invoiceDate={invoiceDate}
                            invoiceNumberPrefix={invoiceNumberPrefix}
                            showControls={showControls}
                            currency={currency}
                            showExtraExpenses={showExtraExpenses}
                            agreementSigningDate={agreementSigningDate}
                            clientContactData={{
                              [ContactInfoLabels.addressLineOne]:
                                clientAddressLineOne,
                              [ContactInfoLabels.addressLineTwo]:
                                clientAddressLineTwo,
                              [ContactInfoLabels.phone]: clientPhone,
                              [ContactInfoLabels.email]: clientEmail,
                            }}
                            consultantContactData={{
                              [ContactInfoLabels.addressLineOne]:
                                consultantAddressLineOne,
                              [ContactInfoLabels.addressLineTwo]:
                                consultantAddressLineTwo,
                              [ContactInfoLabels.phone]: consultantPhone,
                              [ContactInfoLabels.email]: consultantEmail,
                            }}
                            bankAccountData={{
                              [BankAccountInfoLabels.beneficiary]: beneficiary,
                              [BankAccountInfoLabels.beneficiaryAltName]:
                                beneficiaryAltName,
                              [BankAccountInfoLabels.beneficiaryAccount]:
                                beneficiaryAccount,
                              [BankAccountInfoLabels.intermediaryBank]:
                                intermediaryBank,
                              [BankAccountInfoLabels.intermediaryBankSwift]:
                                intermediaryBankSwift,
                              [BankAccountInfoLabels.intermediaryBankAccount]:
                                intermediaryBankAccount,
                              [BankAccountInfoLabels.beneficiaryBank]:
                                beneficiaryBank,
                              [BankAccountInfoLabels.beneficiaryBankSwift]:
                                beneficiaryBankSwift,
                              [BankAccountInfoLabels.beneficiaryBankAddress]:
                                beneficiaryBankAddress,
                            }}
                            timesheetData={timesheetData}
                            onUpdateTimesheetField={onUpdateTimesheetField}
                            onCreateTimesheetEntry={onCreateTimesheetEntry}
                            onDeleteTimesheetEntry={onDeleteTimesheetEntry}
                            extraExpensesData={extraExpensesData}
                            onUpdateExtraExpensesField={
                              onUpdateExtraExpensesField
                            }
                            onCreateExtraExpensesEntry={
                              onCreateExtraExpensesEntry
                            }
                            onDeleteExtraExpensesEntry={
                              onDeleteExtraExpensesEntry
                            }
                          />
                        </Box>
                      </Card>
                    </Col>
                    <Col>
                      <Button onClick={handleToggleShowControls}>
                        {showControls && <EditOutlined />}
                        {showControls ? "Show controls" : "Hide controls"}
                      </Button>
                    </Col>
                  </Row>
                </Flex>
              </Box>
            )}
          </Card>
        </div>
      </Card>
    </Flex>
  );
};

export default Example;
