import { useRouter } from "next/router";
import UsuarioService from "@/services/UsuarioService";
import Cabecalho from "@/componentes/layout/Cabecalho";

const usuarioService = new UsuarioService();

export default function comAutorizacao(Componente) {
    return (props) => {
        const router = useRouter();

        if (typeof windows !== 'undefined') {
            if (!usuarioService.estaAutenticado()) {
                router.replace('/');
                return null;
            }

            return (
                <>
                    <Cabecalho/>
                    <Componente {...props} />
                </>
            ); 
        }

        return null;
    }
}