import react, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import "./index.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DraggableBlock from "../DraggableBlock/DraggableBlock";

function FormCreateTemplate({ style }) {
  const [blocks, setBlocks] = useState([
    { id: "1", content: "Mensagem Inicial", type: "message" },
    { id: "2", content: "Temporizador", type: "timing" },
  ]);

  const [builderBlocks, setBuilderBlocks] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (
      result.source.droppableId === "droppable" &&
      result.destination.droppableId === "builder"
    ) {
      const newBlock = {
        ...blocks[result.source.index],
        id: `${blocks[result.source.index].id}-${builderBlocks.length}`,
      };
      setBuilderBlocks((prev) => [...prev, newBlock]);
    } else if (
      result.source.droppableId === "builder" &&
      result.destination.droppableId === "builder"
    ) {
      const reorderedBlocks = Array.from(builderBlocks);
      const [removed] = reorderedBlocks.splice(result.source.index, 1);
      reorderedBlocks.splice(result.destination.index, 0, removed);
      setBuilderBlocks(reorderedBlocks);
    }
  };

  const handleChange = (index, newContent) => {
    const updatedBlocks = builderBlocks.map((block, i) =>
      i === index ? { ...block, content: newContent } : block
    );
    setBuilderBlocks(updatedBlocks);
  };

  const [nome, setNome] = useState("");
  const [step, setStep] = useState(1);

  function changeStep(step) {
    if (step == 2 && (nome == null || nome.trim() == "")) {
      return alert("Preencha o nome do template!");
    }
    setStep(step);
  }

  if (step == 1) {
    return (
      <>
        <div className="space-y-12" style={style}>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Criar template
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Criação do template que será usado ao enviar as mensagens.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nome do template
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      onChange={({ target }) => setNome(target.value)}
                      style={{ paddingLeft: "1rem" }}
                      value={nome}
                      type="text"
                      name="nome"
                      id="nome"
                      autoComplete="nome"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={() => {
              changeStep(2);
            }}
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Avançar
          </button>
        </div>
      </>
    );
  } else if (step == 2) {
    return (
      <>
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: "flex" }}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    padding: "16px",
                    width: "200px",
                    border: "1px solid gray",
                    borderRadius: "4px",
                    marginRight: "16px",
                  }}
                >
                  {blocks.map((block, index) => (
                    <Draggable
                      key={block.id}
                      draggableId={block.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <DraggableBlock
                            block={block}
                            index={index}
                            onChange={handleChange}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="builder">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    padding: "16px",
                    width: "400px",
                    border: "1px solid gray",
                    borderRadius: "4px",
                    minHeight: "500px",
                  }}
                >
                  {builderBlocks.map((block, index) => (
                    <Draggable
                      key={block.id}
                      draggableId={block.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <DraggableBlock
                            block={block}
                            index={index}
                            onChange={handleChange}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={() => {
              changeStep(1);
            }}
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Avançar
          </button>
        </div>
      </>
    );
  }
}

export default FormCreateTemplate;
