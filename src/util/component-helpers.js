export function getControlParameter({ parameter, data, onChange }, id, type, className, disabledWhenParameterEmpty) {
  let controlParameter = parameter.getParameter(id);

  return {
    data: data,
    parameter: controlParameter,
    id,
    type,
    className,
    onChange,
    disabledWhenParameterEmpty
  }
}

export function willParametersChange(parentParameter, data, nextData, parameterIds) {
  return parameterIds.some(id => {
    let parameter = parentParameter.getParameter(id);
    return parameter.getValue(data) !== parameter.getValue(nextData)
  });
}
