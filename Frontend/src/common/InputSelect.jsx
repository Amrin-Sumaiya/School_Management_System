import { Input, Textarea } from '@material-tailwind/react';
import { CgDanger } from 'react-icons/cg';
import { ScaleLoader } from 'react-spinners';

const InputSelect = ({
  title = '',
  options = [],
  label = '',
  name = '',
  max = '',
  disabled = false,
  inputRef = {},
  isRequired = false,
  error = '',
  onChange = null,
  value = '',
  isMulti = '',
  defaultValue = null,
  prefix = null,
  placeholder = '',
  isSelect = '',
  isRadio = '',
  isInput = '',
  arraySelect = '',
  isTextArea = '',
  control = '',
  regexValue = '',
  regexMessage = '',
  type = '',
  min = null,
  isLoading = '',
  readOnly = false,
}) => {
  const titleClass =
    'px-4 inline-flex  items-center min-w-fit  rounded-md border border-gray-200   text-sm font-medium text-gray-500  bg-sky-50 bg-light-blue-50 ';
  return (
    <>
      <div className=''>
        {title ? (
          <span className={`${titleClass} text-gray-700 my-2`}>
            {title}
            {isRequired ? <font className='text-red-600'>*</font> : <> </>}
          </span>
        ) : (
          ''
        )}

        <div className='flex'>
          {isInput && (
            <Input
              autoComplete='off'
              // placeholder={placeholder}
              color='blue'
              defaultValue={defaultValue}
              // onChange={onChange}
              type={type}
              min={min}
              max={max}
              disabled={disabled}
              label={placeholder}
              readOnly={readOnly}
              // className='rounded-l-none focus:rounded-l-none '
              {...inputRef(name, {
                onChange: onChange,
                required: isRequired,
                pattern: {
                  value: regexValue,
                  message: regexMessage,
                },
              })}
              className=' shadow-sm border-[1px]'
              // className="py-2 px-3 pr-11 block w-full border-gray-200 border shadow-sm rounded-r-md  focus:z-10 focus:outline-[1px] focus:outline-sky-100   font-normal text-base  text-gray-600 "
            />
          )}
          {isTextArea && (
            <Textarea
              autoComplete='off'
              color='blue'
              label={title}
              readOnly={Boolean(readOnly)}
              // readOnly={readOnly}
              {...inputRef(name, {
                onChange: onChange,
                required: isRequired,
                pattern: {
                  value: regexValue,
                  message: regexMessage,
                },
              })}
              // placeholder={placeholder}
              // readOnly={readOnly}
              defaultValue={defaultValue}
              // onChange={onChange}
              type={type}

              // className='rounded-l-none focus:rounded-l-none'
              // className='py-2 px-3 pr-11 block w-full border-gray-200 border shadow-sm rounded-r-md  focus:z-10 focus:outline-[1px] focus:outline-sky-100   font-normal text-base  text-gray-800 '
            />
          )}
          {isSelect && (
            <select
              disabled={disabled}
              color='blue'
              label={title}
              {...inputRef(name, {
                onChange: onChange,
                required: isRequired,
              })}
              className='py-[10px]  rounded-md px-3 pr-11 block w-full border-gray-200 border-[1px] shadow-sm rounded-r-md text-sm focus:z-10 focus:outline-[1px] focus:outline-sky-100    text-gray-800 '
            >
              <option value=''>
                {placeholder ? placeholder : 'Please choose an option'}{' '}
              </option>
              {options?.length > 0
                ? options?.map((item, index) => (
                    <option
                      key={index}
                      selected={item?.value == defaultValue}
                      value={value ? item?.[value] : item?.value}
                    >
                      {prefix} {label ? item?.[label] : item?.label}
                    </option>
                  ))
                : []}
            </select>
          )}

          {isRadio && (
            <div className='py-2 px-3 pr-11 block w-full border-gray-200 border shadow-sm rounded-md  focus:z-10 focus:outline-[1px] focus:outline-sky-100   font-normal text-base  text-gray-600 '>
              <div className='flex gap-x-6'>
                {options?.length > 0
                  ? options?.map((item, index) => (
                      <div
                        className='flex'
                        key={index}
                      >
                        <input
                          value={item?.[value] ?? item?.value}
                          // onChange={onChange}
                          type='radio'
                          className='shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 bg-gray-800  checked:bg-blue-500 checked:border-blue-500 '
                          // checked={item?.value === defaultValue}
                          {...inputRef(name, {
                            onChange: onChange,
                            required: isRequired,
                            defaultChecked: item?.value === defaultValue,
                          })}
                        />
                        <label
                          // htmlFor={item?.value}
                          className='text-sm text-gray-500 ml-2 '
                        >
                          {item?.[label] ?? item?.label}
                        </label>
                      </div>
                    ))
                  : []}
              </div>
            </div>
          )}
          {isLoading && (
            <ScaleLoader
              className='ml-2 flex items-center'
              color='#46B9EE'
              height={20}
            />
          )}
        </div>
      </div>

      {error[name]?.message ? (
        <div className='text-red-400 text-[12px] font-[500] py-2'>
          <p className='flex items-center '>
            <CgDanger size={13} /> {error[name]?.message}
          </p>
        </div>
      ) : error[name] ? (
        <div className='text-red-400 text-[12px] font-[500] py-2'>
          <p className='flex items-center '>
            <CgDanger size={13} /> {`${title ?? name} field is required`}
          </p>
        </div>
      ) : (
        <div className='text-red-400 text-[12px] font-[500] py-4'>
          <p className='flex items-center '></p>
        </div>
      )}
    </>
  );
};

export default InputSelect;
