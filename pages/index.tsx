import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { DateRangePicker, FocusedInputShape, SingleDatePicker } from "react-dates";
import moment, { Moment } from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Switch,
} from "@chakra-ui/react";
import Home from "./Home";
import { Dictionary, ExtraExpensesEntry, TimesheetEntry } from "./common/types";
import { DEFAULT_WORKING_DAY_HOURS, getDaysFromRange, keysToDictionary, ONE, DEFAULT_HOURLY_RATE, DEFAULT_DAILY_RATE, ZERO } from "./common/utils";
import { BankAccountInfoLabels, ContactInfoLabels, Currency } from "./common/enums";



const Example: React.FC = (): JSX.Element => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const [showControls, setShowControls] = useState(false);
  const [currency, setCurrency] = useState<Currency>(Currency.Dollar);
  const [showExtraExpenses, setShowExtraExpenses] = useState(false);
  const handleToggleShowControls = (): void => setShowControls(!showControls);
  const handleToggleExtraExpenses = (): void => setShowExtraExpenses(!showExtraExpenses);
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
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);
  const [workdaysFilter, setWorkdaysFilter] = useState(true);
  const [rate, setRate] = useState(ZERO);//(DEFAULT_HOURLY_RATE);
  const [hours, setHours] = useState(ZERO);//(DEFAULT_WORKING_DAY_HOURS);

  const [focusedAgreementSigningDate, setFocusedAgreementSigningDate] = useState<boolean>(false);
  const [agreementSigningDate, setAgreementSigningDate] = useState<Moment | null>(moment());

  const [focusedInvoiceDate, setFocusedInvoiceDate] = useState<boolean>(false);
  const [invoiceDate, setInvoiceDate] = useState<Moment | null>(moment());


  const [invoiceNumberPrefix, setInvoiceNumberPrefix] = useState<string>("");

  const [consultantName, setConsultantName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");

  const [consultantAddressLineOne, setConsultantAddressLineOne] = useState<string>("");
  const [consultantAddressLineTwo, setConsultantAddressLineTwo] = useState<string>("");
  const [consultantPhone, setConsultantPhone] = useState<string>("");
  const [consultantEmail, setConsultantEmail] = useState<string>("");
  const [clientAddressLineOne, setClientAddressLineOne] = useState<string>("");
  const [clientAddressLineTwo, setClientAddressLineTwo] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");

  const [timesheetData, setTimesheetData] = useState<Dictionary<string, TimesheetEntry>>({});
  const [extraExpensesData, setExtraExpensesData] = useState<Dictionary<string, ExtraExpensesEntry>>({});


  const [beneficiary, setBeneficiary] = useState<string>("");
  const [beneficiaryAltName, setBeneficiaryAltName] = useState<string>("");
  const [beneficiaryAccount, setBeneficiaryAccount] = useState<string>("");
  const [intermediaryBank, setIntermediaryBank] = useState<string>("");
  const [intermediaryBankSwift, setIntermediaryBankSwift] = useState<string>("");
  const [intermediaryBankAccount, setIntermediaryBankAccount] = useState<string>("");
  const [beneficiaryBank, setBeneficiaryBank] = useState<string>("");
  const [beneficiaryBankSwift, setBeneficiaryBankSwift] = useState<string>("");
  const [beneficiaryBankAddress, setBeneficiaryBankAddress] = useState<string>("");

  const handleDatesChange = (arg: {
    startDate: Moment | null;
    endDate: Moment | null;
  }): void => {
    setStartDate(arg.startDate);
    setEndDate(arg.endDate);
  };

  const handleFocusChange = (arg: FocusedInputShape | null): void => {
    setFocusedInput(arg);
  };

  const handleToggleWorkdaysFilter = (): void => workdaysFilter ? setWorkdaysFilter(false) : setWorkdaysFilter(true);

  const toggleShowPreview = (): void => showPreview ? setShowPreview(false) : setShowPreview(true);
  const handleShowPreview = (): void => {
    handleTimesheetSetup();
    toggleShowPreview();
  };


  const onUpdateTimesheetField = (timesheetData: Dictionary<string, TimesheetEntry>, fieldName: string, chosenTimestampKey: string, newValue: string): void => {
    const updatedTimesheetData = {
      ...timesheetData,
      [chosenTimestampKey]: {
        ...timesheetData[chosenTimestampKey],
        [fieldName]: Number(newValue),
      },
    };
    setTimesheetData(updatedTimesheetData);
  };

  const onCreateTimesheetEntry = (timesheetData: Dictionary<string, TimesheetEntry>): void => {
    const nextDayTimestampKey: string = moment(Object.keys(timesheetData)[Object.keys(timesheetData).length - ONE]).add(ONE, "days").format("YYYY-MM-DD");
    const todayTimestampKey = moment().format("YYYY-MM-DD");
    const rateOfPreviousEntry: number = timesheetData[Object.keys(timesheetData)[Object.keys(timesheetData).length - ONE]]?.rate;
    const workingHoursOfPreviousEntry: number = timesheetData[Object.keys(timesheetData)[Object.keys(timesheetData).length - ONE]]?.hours;
    const updatedTimesheetData = {
      ...timesheetData,
      [nextDayTimestampKey || todayTimestampKey]: {
        hours: workingHoursOfPreviousEntry || DEFAULT_WORKING_DAY_HOURS,
        rate: rateOfPreviousEntry || DEFAULT_HOURLY_RATE,
      },
    };
    setTimesheetData(updatedTimesheetData);
  };

  const onDeleteTimesheetEntry = (timesheetData: Dictionary<string, TimesheetEntry>, chosenTimestampKey: string): void => {
    const updatedTimesheetData = Object.keys(timesheetData).reduce((updatedTimesheetData, timestampKey) => {
      return timestampKey === chosenTimestampKey
        ? updatedTimesheetData
        : {
          ...updatedTimesheetData,
          [timestampKey]: timesheetData[timestampKey],
        };
    }, {});
    setTimesheetData(updatedTimesheetData);
  };

  const handleTimesheetSetup = (): void => {
    setTimesheetData(
      keysToDictionary(
        getDaysFromRange(
          startDate,
          endDate,
          workdaysFilter
        ),
        {
          rate: rate,
          hours: hours,
        }
      ),
    );
  };

  const onUpdateExtraExpensesField = (
    extraExpensesData: Dictionary<string, ExtraExpensesEntry>,
    chosenEntryKey: string,
    fieldName: string,
    newValue: string
  ): void => {
    const updatedExtraExpensesData = {
      ...extraExpensesData,
      [chosenEntryKey]: {
        ...extraExpensesData[chosenEntryKey],
        [fieldName]: fieldName === "amount" ? Number(newValue) : newValue,
      },
    };
    setExtraExpensesData(updatedExtraExpensesData);
  };

  const onCreateExtraExpensesEntry = (extraExpensesData: Dictionary<string, ExtraExpensesEntry>): void => {
    const nextDayTimestampKey = moment(Object.keys(extraExpensesData)[Object.keys(extraExpensesData).length - ONE]).add(ONE, "days").format("YYYY-MM-DD");
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

  const onDeleteExtraExpensesEntry = (extraExpensesData: Dictionary<string, ExtraExpensesEntry>, chosenEntryKey: string): void => {
    const updatedExtraExpensesData = Object.keys(extraExpensesData).reduce((updatedExtraExpensesData, entryKey) => {
      return entryKey === chosenEntryKey
        ? updatedExtraExpensesData
        : {
          ...updatedExtraExpensesData,
          [entryKey]: extraExpensesData[entryKey],
        };
    }, {});
    setExtraExpensesData(updatedExtraExpensesData);
  };



  return (
    <Flex direction={"column"} padding={12} backgroundColor={"#e8ebf2"} justify={"center"}>
      <Flex border={"1px solid #edeff4"} justify={"center"} borderRadius={20} minWidth={1150} backgroundColor={"#6a7ca3"}>
        {showPreview &&
          <Box margin={5} borderRadius={20}>
            <Flex background={"white"} borderRadius={20}>
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
                    [ContactInfoLabels.addressLineOne]: clientAddressLineOne,
                    [ContactInfoLabels.addressLineTwo]: clientAddressLineTwo,
                    [ContactInfoLabels.phone]: clientPhone,
                    [ContactInfoLabels.email]: clientEmail,
                  }}
                  consultantContactData={{
                    [ContactInfoLabels.addressLineOne]: consultantAddressLineOne,
                    [ContactInfoLabels.addressLineTwo]: consultantAddressLineTwo,
                    [ContactInfoLabels.phone]: consultantPhone,
                    [ContactInfoLabels.email]: consultantEmail,
                  }}
                  bankAccountData={{
                    [BankAccountInfoLabels.beneficiary]: beneficiary,
                    [BankAccountInfoLabels.beneficiaryAltName]: beneficiaryAltName,
                    [BankAccountInfoLabels.beneficiaryAccount]: beneficiaryAccount,
                    [BankAccountInfoLabels.intermediaryBank]: intermediaryBank,
                    [BankAccountInfoLabels.intermediaryBankSwift]: intermediaryBankSwift,
                    [BankAccountInfoLabels.intermediaryBankAccount]: intermediaryBankAccount,
                    [BankAccountInfoLabels.beneficiaryBank]: beneficiaryBank,
                    [BankAccountInfoLabels.beneficiaryBankSwift]: beneficiaryBankSwift,
                    [BankAccountInfoLabels.beneficiaryBankAddress]: beneficiaryBankAddress,
                  }}
                  timesheetData={timesheetData}
                  onUpdateTimesheetField={onUpdateTimesheetField}
                  onCreateTimesheetEntry={onCreateTimesheetEntry}
                  onDeleteTimesheetEntry={onDeleteTimesheetEntry}
                  extraExpensesData={extraExpensesData}
                  onUpdateExtraExpensesField={onUpdateExtraExpensesField}
                  onCreateExtraExpensesEntry={onCreateExtraExpensesEntry}
                  onDeleteExtraExpensesEntry={onDeleteExtraExpensesEntry}
                />
              </Box>
            </Flex>
          </Box>}
        <Box padding={10}>
          <Flex flex={1} maxWidth={1150} direction={"column"}>
            {showPreview && <Button padding={3} minWidth={330} margin={1} onClick={handlePrint} colorScheme={"teal"} size={"lg"}>
              {"I'm done. Print this out!"}
            </Button>}
            <Button
              alignSelf={"center"} 
              maxWidth={690} 
              minWidth={330} 
              padding={3} 
              margin={1} 
              onClick={handleShowPreview} 
              colorScheme={"teal"} 
              size={"lg"}>
              {showPreview ? "Go back" : "Show preview"}
            </Button>
            {false && <Button padding={3} onClick={null} colorScheme={"teal"} size={"lg"}>
              {"Save draft"}
            </Button>}
            {showPreview && <FormControl padding={2} paddingTop={6} display={"flex"} justifyContent={"flex-start"} alignItems={"center"}>
              <Switch
                colorScheme={"teal"}
                padding={4}
                id={"show-buttons"}
                size={"lg"}
                onChange={handleToggleShowControls}
              />
              <FormLabel color={"#e5ebf9"}>
                {"Show edit buttons"}
              </FormLabel>
            </FormControl>}
            {!showPreview &&
              <Box>
                <Flex direction={"row"}>
                  <Box flex={1}>
                    <FormControl flex={1} justifyContent={"center"} flexDirection={"column"} alignItems={"center"} padding={4}>
                      <Box padding={2} textStyle={"directionHeader"}>{"Timesheet setup"}</Box>
                      <Box textStyle={"directionText"} padding={3}>
                        <FormLabel>{"Invoice Number Prefix"}</FormLabel>
                        <Input id={"invoiceNumberPrefix"} onChange={(e) => setInvoiceNumberPrefix(e.target.value)} value={invoiceNumberPrefix} />
                        <FormHelperText>{"Enter invoice number prefix"}</FormHelperText>
                      </Box>
                      {defaultClient ? <Box padding={3} textStyle={"directionText"}>
                        <FormLabel>{"Working hours per day"}</FormLabel>
                        <Input id={"hours"} onChange={(e) => setHours(Number(e.target.value))} value={hours} />
                        <FormHelperText>{"Enter working hours value"}</FormHelperText>
                      </Box> : ""}
                      <Box textStyle={"directionText"} padding={3}>
                        <FormLabel>{"Rate"}</FormLabel>
                        <Flex alignItems={"center"} direction={"row"}>
                          <Input id={"rate"} onChange={(e) => setRate(Number(e.target.value))} value={rate} />
                          <RadioGroup
                            name={"currency"}
                            value={currency}
                            onChange={event => setCurrency(event as Currency)}
                          >
                            <Box>
                              <Radio size={"sm"} paddingX={2} colorScheme={"teal"} value={Currency.Dollar}>
                                {"USD"}
                              </Radio>
                              <Radio size={"sm"} paddingX={2} colorScheme={"teal"} value={Currency.Euro}>
                                {"EUR"}
                              </Radio>
                            </Box>
                          </RadioGroup>
                        </Flex>
                        <FormHelperText>{"Enter rate value"}</FormHelperText>
                      </Box>
                      <Box padding={3}>
                        <Box padding={2} textStyle={"directionHeader"}>{"Select date range"}</Box>
                        <DateRangePicker
                          startDate={startDate}
                          startDateId={"start_date_id"}
                          endDate={endDate}
                          endDateId={"end_date_id"}
                          onDatesChange={handleDatesChange}
                          focusedInput={focusedInput}
                          onFocusChange={handleFocusChange}
                          orientation={"vertical"}
                          // small={true}
                          showClearDates={true}
                          isOutsideRange={() => false}
                          isDayBlocked={(momentDate) =>
                            workdaysFilter && (momentDate.format("d") === "0" || momentDate.format("d") === "6")
                          }
                          firstDayOfWeek={1}
                        />
                      </Box>
                      <Checkbox
                        padding={3}
                        size={"md"}
                        id={"disable-saturdays-and-sundays"}
                        onChange={handleToggleWorkdaysFilter}
                        colorScheme={"teal"}
                        defaultIsChecked={false}
                        textStyle={"directionText"}
                      >
                        {"Include Saturdays and Sundays"}
                      </Checkbox>
                    </FormControl>
                  </Box>
                  <Box flex={1}>
                    <FormControl justifyContent={"center"} flexDirection={"column"} alignItems={"center"} padding={4}>
                      <Box padding={2} textStyle={"directionHeader"}>{"Client info"}</Box>
                      <Box textStyle={"directionText"} padding={3}>
                        <FormLabel>{"Company name"}</FormLabel>
                        <Input id={"clientName"} onChange={(e) => setClientName(e.target.value)} value={clientName} />
                        <FormHelperText>{"Enter company name"}</FormHelperText>
                      </Box>
                      <Box textStyle={"directionText"} padding={3}>
                        <FormLabel>{"Address"}</FormLabel>
                        <Input id={"clientAddressLineOne"} value={clientAddressLineOne} onChange={(e) => setClientAddressLineOne(e.target.value)} />
                        <Input id={"clientAddressLineTwo"} value={clientAddressLineTwo} onChange={(e) => setClientAddressLineTwo(e.target.value)} />
                        <FormHelperText>{"Enter client address"}</FormHelperText>
                      </Box>
                      <Box textStyle={"directionText"} padding={3}>
                        <FormLabel>{"Phone"}</FormLabel>
                        <Input id={"clientPhone"} value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
                        <FormHelperText>{"Enter client phone number"}</FormHelperText>
                      </Box>
                      <Box textStyle={"directionText"} padding={3}>
                        <FormLabel>{"Email"}</FormLabel>
                        <Input id={"clientEmail"} value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
                        <FormHelperText>{"Enter client Email"}</FormHelperText>
                      </Box>
                    </FormControl>
                  </Box>
                  <Box flex={1}>
                    <Flex alignItems={"center"} justify={"space-between"} padding={4}>
                      <Box padding={2} textStyle={"directionHeader"}>{"Agreement signing date"}</Box>
                      <Box padding={3}>
                        <SingleDatePicker
                          date={agreementSigningDate}
                          onDateChange={chosenDate => setAgreementSigningDate(chosenDate)}
                          focused={focusedAgreementSigningDate}
                          onFocusChange={({ focused }) => setFocusedAgreementSigningDate(focused)}
                          id={"agreementSigningDate"}
                          firstDayOfWeek={1}
                          isOutsideRange={() => false}
                          showClearDate={true}
                          numberOfMonths={1}
                          keepOpenOnDateSelect={false}
                        />
                      </Box>
                    </Flex>
                    <Flex alignItems={"center"} justify={"space-between"} padding={4}>
                      <Box padding={2} textStyle={"directionHeader"}>{"Invoice date"}</Box>
                      <Box padding={3}>
                        <SingleDatePicker
                          date={invoiceDate}
                          onDateChange={chosenDate => setInvoiceDate(chosenDate)}
                          focused={focusedInvoiceDate}
                          onFocusChange={({ focused }) => setFocusedInvoiceDate(focused)}
                          id={"invoiceDate"}
                          firstDayOfWeek={1}
                          isOutsideRange={() => false}
                          showClearDate={true}
                          numberOfMonths={1}
                          keepOpenOnDateSelect={false}
                        />
                      </Box>
                    </Flex>
                    <Flex justify={"center"}>
                      <Button onClick={() => handleSwitchClient()} minWidth={330} colorScheme={"teal"} size={"lg"} margin={2}>
                        {defaultClient ? "Switch to daily rate" : "Switch to hourly rate"}
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
                <Flex direction={"row"}>
                  <FormControl justifyContent={"center"} flexDirection={"column"} alignItems={"center"} padding={4}>
                    <Box padding={2} textStyle={"directionHeader"}>{"Consultant info"}</Box>
                    <Box padding={3} textStyle={"directionText"}>
                      <FormLabel>{"Consultant name"}</FormLabel>
                      <Input id={"consultantName"} onChange={(e) => setConsultantName(e.target.value)} value={consultantName} />
                      <FormHelperText>{"Enter Consultant name"}</FormHelperText>
                    </Box>
                    <Box padding={3} textStyle={"directionText"}>
                      <FormLabel>{"Address"}</FormLabel>
                      <Input
                        id={"consultantAddressLineOne"}
                        value={consultantAddressLineOne}
                        onChange={(e) => setConsultantAddressLineOne(e.target.value)}
                      />
                      <Input
                        id={"consultantAddressLineTwo"}
                        value={consultantAddressLineTwo}
                        onChange={(e) => setConsultantAddressLineTwo(e.target.value)}
                      />
                      <FormHelperText>{"Enter consultant address"}</FormHelperText>
                    </Box>
                    <Box padding={3} textStyle={"directionText"}>
                      <FormLabel>{"Phone"}</FormLabel>
                      <Input id={"consultantPhone"} value={consultantPhone} onChange={(e) => setConsultantPhone(e.target.value)} />
                      <FormHelperText>{"Enter consultant phone number"}</FormHelperText>
                    </Box>
                    <Box padding={3} textStyle={"directionText"}>
                      <FormLabel>{"Email"}</FormLabel>
                      <Input id={"consultantEmail"} value={consultantEmail} onChange={(e) => setConsultantEmail(e.target.value)} />
                      <FormHelperText>{"Enter consultant Email"}</FormHelperText>
                    </Box>
                  </FormControl>
                  <FormControl justifyContent={"center"} flexDirection={"column"} alignItems={"center"} padding={4}>
                    <Box padding={2} textStyle={"directionHeader"}>{"Bank account info"}</Box>
                    <Box padding={3} textStyle={"directionText"} >
                      <FormLabel>{BankAccountInfoLabels.beneficiary}</FormLabel>
                      <Input id={"beneficiary"} onChange={(e) => setBeneficiary(e.target.value)} value={beneficiary} />
                    </Box>
                    <Box padding={3} textStyle={"directionText"}>
                      <FormLabel>{BankAccountInfoLabels.beneficiaryAltName}</FormLabel>
                      <Input id={"beneficiaryAltName"} onChange={(e) => setBeneficiaryAltName(e.target.value)} value={beneficiaryAltName} />
                    </Box>
                    <Box padding={3} textStyle={"directionText"}>
                      <FormLabel>{BankAccountInfoLabels.beneficiaryAccount}</FormLabel>
                      <Input id={"beneficiaryAccount"} onChange={(e) => setBeneficiaryAccount(e.target.value)} value={beneficiaryAccount} />
                    </Box>
                    <Box padding={3} textStyle={"directionText"}>
                      <FormLabel>{BankAccountInfoLabels.intermediaryBank}</FormLabel>
                      <Input id={"intermediaryBank"} onChange={(e) => setIntermediaryBank(e.target.value)} value={intermediaryBank} />
                    </Box>
                    <Box padding={3} textStyle={"directionText"}>
                      <FormLabel>{BankAccountInfoLabels.intermediaryBankSwift}</FormLabel>
                      <Input id={"intermediaryBankSwift"} onChange={(e) => setIntermediaryBankSwift(e.target.value)} value={intermediaryBankSwift} />
                    </Box>
                    <Box padding={3} textStyle={"directionText"}>
                      <FormLabel>{BankAccountInfoLabels.intermediaryBankAccount}</FormLabel>
                      <Input id={"intermediaryBankAccount"} onChange={(e) => setIntermediaryBankAccount(e.target.value)} value={intermediaryBankAccount} />
                    </Box>
                    <Box padding={3} textStyle={"directionText"}>
                      <FormLabel>{BankAccountInfoLabels.beneficiaryBank}</FormLabel>
                      <Input id={"beneficiaryBank"} onChange={(e) => setBeneficiaryBank(e.target.value)} value={beneficiaryBank} />
                    </Box>
                    <Box padding={3} textStyle={"directionText"}>
                      <FormLabel>{BankAccountInfoLabels.beneficiaryBankSwift}</FormLabel>
                      <Input id={"beneficiaryBankSwift"} onChange={(e) => setBeneficiaryBankSwift(e.target.value)} value={beneficiaryBankSwift} />
                    </Box>
                    <Box padding={3} textStyle={"directionText"}>
                      <FormLabel>{BankAccountInfoLabels.beneficiaryBankAddress}</FormLabel>
                      <Input id={"beneficiaryBankAddress"} onChange={(e) => setBeneficiaryBankAddress(e.target.value)} value={beneficiaryBankAddress} />
                    </Box>
                  </FormControl>
                </Flex>
              </Box>}
            <FormControl justifyContent={"flex-start"} display={"flex"} alignItems={"center"}>
              <Switch
                padding={6}
                colorScheme={"teal"}
                id={"show-extra-expenses"}
                size={"lg"}
                onChange={handleToggleExtraExpenses}
              />
              <FormLabel color={"#e5ebf9"} htmlFor={"show-extra-expenses"} marginBottom={"0"}>
                {"I need an Extra Expenses block"}
              </FormLabel>
            </FormControl>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Example;

