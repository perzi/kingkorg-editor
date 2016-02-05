export function getControlParameter({ parameter, data }, id, type) {
  let constrolParameter = parameter.getParameter(id);

  return {
    data: data,
    parameter: constrolParameter,
    id,
    type
  }
}
