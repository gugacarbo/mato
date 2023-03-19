import styled from "styled-components";
import { useState, useContext, useEffect } from "react";

import PlanContext from "../../../../../../../../context/PlanContext";
import { ReactComponent as PencilSvg } from "../../../../../../../../assets/pencil.svg";
import { ReactComponent as TrashSvg } from "../../../../../../../../assets/trash.svg";
import { ReactComponent as SaveSvg } from "../../../../../../../../assets/save.svg";
import { ReactComponent as XSvg } from "../../../../../../../../assets/x.svg";

function PlanItem({ item }) {
  const { deletePlan, changePlan, changeName, currentPlanName } = useContext(PlanContext)
  const [edit, setEdit] = useState(false)
  const [newName, setNewName] = useState(item)

  return (
    <ItemContent>
      <ItemName
        onClick={() => changePlan(item)}
        editing={edit}
        as={edit ? 'input' : 'span'}
        value={newName}
        selected={item == currentPlanName}
        onChange={({ target }) => setNewName(target.value)}
      >{item}</ItemName>

      <EditSave editing={edit} as={edit ? SaveSvg : PencilSvg} onClick={() => {
        setEdit(p => !p)
        setNewName(item)
        edit && changeName(item, newName)
      }} />

      <Delete
        onClick={() => edit ? (setEdit(p => !p) && setNewName(item)) : deletePlan(item)}
        editing={edit}
        as={edit ? XSvg : TrashSvg} />
    </ItemContent>
  );
}

export default PlanItem;


const ItemContent = styled.div`
  width: 100%;
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  display: flex;
  grid-gap: 0.4rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgroundDark};
  &:nth-child(even){
    background-color: ${({ theme }) => theme.backgroundMedium};

  }
`

const ItemName = styled.input`
  border: none;
  outline: none;
  text-align: left;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  font-weight: 400;
  font-family: "Poppins";
  overflow: hidden;

  text-overflow: ellipsis;

  width: 100%;
  min-width: 5rem;
  color: ${({ theme, selected }) => selected ? theme.color.main.light : theme.text};
  border-bottom: 1px solid ${({ editing, theme, selected }) => editing ? theme.color.main.light : 'transparent'};
  
`


const EditSave = styled(PencilSvg)`
  fill:${({ editing, theme }) => editing ? theme.color.green : theme.text};
  width: 1.4rem;
  transition: ${({ theme }) => theme.transition.fast};
  cursor: pointer;
  &:hover{
    fill: ${({ theme, editing }) => editing ? theme.color.green : theme.color.main.light};
  }
 `
const Delete = styled(TrashSvg)`
  fill:${({ editing, theme }) => editing ? theme.color.red : theme.text};
  width: 1.25rem;
  margin-left: 0.8rem;
  transition: ${({ theme }) => theme.transition.fast};
  cursor: pointer;
  &:hover{
    fill: ${({ theme }) => theme.color.red};
    
  }
`