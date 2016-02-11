export function getControlParameter({ parameter, data, onChange }, id, type, className) {
  let controlParameter = parameter.getParameter(id);

  return {
    data: data,
    parameter: controlParameter,
    id,
    type,
    className,
    onChange
  }
}

export function  willParametersChange(parentParameter, data, nextData, parameterIds) {
  return parameterIds.some(id => {
    let parameter = parentParameter.getParameter(id);
    return parameter.getValue(data) !== parameter.getValue(nextData)
  });
}
