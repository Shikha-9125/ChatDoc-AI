import {create} from "zustand"

type State = {
    response: string ,
    isGenerating: boolean
}

type Action = {
    updateResponse : (response: State['response'])=>void
    clearResponse : (respond: State['response'])=>void
}

const useResponse = create<State & Action>((set)=>({
    response:"",
    isGenerating:false,
    updateResponse: (word)=>set((state)=>({response:state.response+word, isGenerating:true})),
    clearResponse : (word)=>set((state)=>({response:word, isGenerating:false}))
}))

export default useResponse;