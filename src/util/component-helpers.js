export function getControlParameter({ parameter, data, onChange }, id, type, className) {
  let constrolParameter = parameter.getParameter(id);

  return {
    data: data,
    parameter: constrolParameter,
    id,
    type,
    className,
    onChange
  }
}
